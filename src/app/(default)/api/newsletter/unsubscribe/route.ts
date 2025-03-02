import { NextResponse } from "next/server";
import conn from "@/src/lib/db";
import { cryptService } from "@/src/lib/crypt";
import { checkEmailRegEx } from "@/src/lib/validation";

interface UnsubscribeBody {
  email: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as UnsubscribeBody;
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!checkEmailRegEx(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
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

    await conn?.query("BEGIN");

    const deleteResult = await conn?.query(
      `
      WITH subscription AS (
        SELECT id FROM newsletter 
        WHERE hash = $1 AND verified = true
        LIMIT 1
      ),
      verification_cleanup AS (
        DELETE FROM verification 
        WHERE newsletter_id IN (SELECT id FROM subscription)
      )
      DELETE FROM newsletter 
      WHERE id IN (SELECT id FROM subscription)
      RETURNING id
    `,
      [emailHash],
    );

    if (!deleteResult?.rowCount) {
      await conn?.query("ROLLBACK");
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 },
      );
    }

    await conn?.query("COMMIT");

    return NextResponse.json(
      { message: "Successfully unsubscribed from newsletter" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing unsubscribe request:", error);

    try {
      await conn?.query("ROLLBACK");
    } catch (rollbackErr) {
      console.error("Rollback error:", rollbackErr);
    }

    return NextResponse.json(
      { error: "Failed to process request. Please try again later." },
      { status: 500 },
    );
  }
}
