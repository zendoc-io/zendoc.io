import { NextResponse } from "next/server";
import conn from "@/src/lib/db";
import { emailService } from "@/src/lib/emailService";
import { cryptService } from "@/src/lib/crypt";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/newsletter/verified?status=invalid", request.url),
    );
  }

  try {
    await conn?.query("BEGIN");

    const verificationResult = await conn?.query(
      `SELECT v.newsletter_id, v.expires_at, n.email, n.extensive, n.verified 
       FROM verification v 
       JOIN newsletter n ON v.newsletter_id = n.id
       WHERE v.token = $1 LIMIT 1`,
      [token],
    );

    if (!verificationResult?.rows.length) {
      await conn?.query("ROLLBACK");
      return NextResponse.redirect(
        new URL("/newsletter/verified?status=invalid", request.url),
      );
    }

    const subscriptionData = verificationResult.rows[0];

    if (new Date(subscriptionData.expires_at) < new Date()) {
      await conn?.query("ROLLBACK");
      return NextResponse.redirect(
        new URL("/newsletter/verified?status=expired", request.url),
      );
    }

    const decryptedEmail = cryptService.decrypt(subscriptionData.email);
    if (!decryptedEmail) {
      console.error("Email decryption failed!");
      await conn?.query("ROLLBACK");
      return NextResponse.redirect(
        new URL("/newsletter/verified?status=error", request.url),
      );
    }

    if (subscriptionData.verified) {
      await conn?.query(`DELETE FROM verification WHERE newsletter_id = $1`, [
        subscriptionData.newsletter_id,
      ]);

      await conn?.query("COMMIT");
      return NextResponse.redirect(
        new URL("/newsletter/verified?status=already-verified", request.url),
      );
    }

    await conn?.query(
      `UPDATE newsletter SET verified = true, updated_at = NOW() WHERE id = $1`,
      [subscriptionData.newsletter_id],
    );

    await conn?.query(`DELETE FROM verification WHERE newsletter_id = $1`, [
      subscriptionData.newsletter_id,
    ]);

    await conn?.query("COMMIT");

    emailService
      .sendNewsletterConfirmation(decryptedEmail, subscriptionData.extensive)
      .catch((err) => console.error("Failed to send welcome email:", err));

    return NextResponse.redirect(
      new URL("/newsletter/verified?status=success", request.url),
    );
  } catch (err) {
    console.error("Verification error:", err);
    await conn?.query("ROLLBACK");
    return NextResponse.redirect(
      new URL("/newsletter/verified?status=error", request.url),
    );
  }
}
