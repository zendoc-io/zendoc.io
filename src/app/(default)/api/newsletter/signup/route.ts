import conn from "@/src/lib/db";
import { cryptService } from "@/src/lib/crypt";
import { checkEmailRegEx } from "@/src/lib/validation";
import { emailService } from "@/src/lib/emailService";
import { NextResponse } from "next/server";

interface SignupBody {
  email: string;
  extensive: boolean;
}

export async function POST(req: Request) {
  if (req.headers.get("content-type") !== "application/json") {
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 },
    );
  }

  let body: SignupBody;
  try {
    body = (await req.json()) as SignupBody;
  } catch (err) {
    console.error("Error parsing request body:", err);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const { email, extensive } = body;

  if (!email || extensive === undefined) {
    return NextResponse.json(
      { error: "Email and subscription type are required" },
      { status: 400 },
    );
  }

  if (!checkEmailRegEx(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  const emailHash = cryptService.hash(email);
  if (!emailHash) {
    return NextResponse.json(
      { error: "Failed to process email" },
      { status: 500 },
    );
  }

  try {
    await conn?.query("BEGIN");

    const existingSubscription = await conn?.query(
      `SELECT id, verified FROM newsletter WHERE hash = $1 LIMIT 1`,
      [emailHash],
    );

    if (
      existingSubscription?.rows.length &&
      existingSubscription.rows[0].verified
    ) {
      await conn?.query("COMMIT");
      return NextResponse.json(
        { error: "This email is already subscribed to our newsletter" },
        { status: 409 },
      );
    }

    if (existingSubscription?.rows.length) {
      const verificationToken = cryptService.createVerificationToken();
      const newsletterId = existingSubscription.rows[0].id;

      await conn?.query(
        `UPDATE verification SET token = $1, expires_at = NOW() + INTERVAL '24 hours' 
         WHERE newsletter_id = $2`,
        [verificationToken, newsletterId],
      );

      await conn?.query("COMMIT");

      try {
        await emailService.sendVerificationEmail(
          email,
          extensive,
          verificationToken,
        );
        return NextResponse.json(
          { message: "Verification email sent. Please check your inbox." },
          { status: 200 },
        );
      } catch (emailErr) {
        console.error("Failed to send verification email:", emailErr);
        return NextResponse.json(
          {
            error: "Failed to send verification email. Please try again later.",
          },
          { status: 500 },
        );
      }
    }

    const cipherText = cryptService.encrypt(email);
    if (!cipherText) {
      await conn?.query("ROLLBACK");
      console.error("Encryption failed!");
      return NextResponse.json(
        { error: "Something wen't wrong!" },
        { status: 500 },
      );
    }

    const verificationToken = cryptService.createVerificationToken();

    const insertResult = await conn?.query(
      `INSERT INTO newsletter (email, hash, extensive, verified) 
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [cipherText, emailHash, extensive, false],
    );

    if (!insertResult?.rowCount) {
      await conn?.query("ROLLBACK");
      return NextResponse.json(
        { error: "Failed to create subscription" },
        { status: 500 },
      );
    }

    const newsletterId = insertResult.rows[0].id;

    await conn?.query(
      `INSERT INTO verification (newsletter_id, token, expires_at) 
       VALUES ($1, $2, NOW() + INTERVAL '24 hours')`,
      [newsletterId, verificationToken],
    );

    await conn?.query("COMMIT");

    try {
      await emailService.sendVerificationEmail(
        email,
        extensive,
        verificationToken,
      );
      return NextResponse.json(
        { message: "Verification email sent. Please check your inbox." },
        { status: 200 },
      );
    } catch (emailErr) {
      console.error("Failed to send verification email:", emailErr);

      try {
        await conn?.query("BEGIN");
        await conn?.query(`DELETE FROM newsletter WHERE id = $1`, [
          newsletterId,
        ]);
        await conn?.query("COMMIT");
      } catch (deleteErr) {
        console.error("Failed to clean up after email error:", deleteErr);
        await conn?.query("ROLLBACK");
      }

      return NextResponse.json(
        { error: "Failed to send verification email. Please try again later." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Database error:", err);
    await conn?.query("ROLLBACK");
    return NextResponse.json(
      { error: "Subscription failed. Please try again later." },
      { status: 500 },
    );
  }
}
