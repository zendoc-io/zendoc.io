import { redirect } from "next/navigation";
import conn from "@/src/lib/db";
import { QueryResult } from "pg";
import { emailService } from "@/src/lib/emailService";
import { cryptService } from "@/src/lib/crypt";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return redirect("/newsletter/verified");
  }

  try {
    await conn?.query("BEGIN");
    const tokenResponse: QueryResult | undefined = await conn?.query(
      `SELECT newsletter_id, expires_at FROM verification 
       WHERE token = $1 LIMIT 1`,
      [token],
    );

    if (!tokenResponse || tokenResponse.rows.length === 0) {
      await conn?.query("ROLLBACK");
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/newsletter/verified?status=invalid",
        },
      });
    }

    const tokenData = tokenResponse.rows[0];
    if (new Date(tokenData.expires_at) < new Date()) {
      await conn?.query("ROLLBACK");
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/newsletter/verified?status=expired",
        },
      });
    }

    const subscriptionResponse: QueryResult | undefined = await conn?.query(
      `SELECT id, email, extensive, verified FROM newsletter WHERE id = $1 LIMIT 1`,
      [tokenData.newsletter_id],
    );

    if (!subscriptionResponse || subscriptionResponse.rows.length === 0) {
      await conn?.query("ROLLBACK");
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/newsletter/verified?status=error",
        },
      });
    }

    const subscription = subscriptionResponse.rows[0];
    const decryptedEmail = cryptService.decrypt(subscription.email);

    if (!decryptedEmail) {
      console.error("Email decryption failed!");
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/newsletter/verified?status=error",
        },
      });
    }

    if (subscription.verified) {
      await conn?.query(`DELETE FROM verification WHERE newsletter_id = $1`, [
        subscription.id,
      ]);

      await conn?.query("COMMIT");
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/newsletter/verified?status=already-verified",
        },
      });
    }

    await conn?.query(
      `UPDATE newsletter SET verified = true, updated_at = NOW() WHERE id = $1`,
      [subscription.id],
    );

    await conn?.query(`DELETE FROM verification WHERE newsletter_id = $1`, [
      subscription.id,
    ]);

    await conn?.query("COMMIT");

    try {
      await emailService.sendNewsletterConfirmation(
        decryptedEmail,
        subscription.extensive,
      );
    } catch (emailErr) {
      console.error("Failed to send welcome email:", emailErr);
    }
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/newsletter/verified?status=success",
      },
    });
  } catch (err) {
    console.error("Verification error:", err);
    await conn?.query("ROLLBACK");
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/newsletter/verified?status=error",
      },
    });
  }
}
