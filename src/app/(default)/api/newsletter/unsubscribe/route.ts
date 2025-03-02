import conn from "@/src/lib/db";
import { cryptService } from "@/src/lib/crypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return new Response("Email is required", { status: 400 });
    }

    const emailHash = cryptService.hash(email);
    if (!emailHash) {
      return new Response("Failed to process email", { status: 500 });
    }

    await conn?.query("BEGIN");

    const subscriptionResponse = await conn?.query(
      `SELECT id, verified FROM newsletter WHERE hash = $1 LIMIT 1`,
      [emailHash],
    );

    if (
      !subscriptionResponse ||
      subscriptionResponse.rows.length === 0 ||
      !subscriptionResponse.rows[0].verified
    ) {
      await conn?.query("ROLLBACK");
      return new Response("Subscription not found", { status: 404 });
    }

    const subscriptionId = subscriptionResponse.rows[0].id;

    await conn?.query(`DELETE FROM verification WHERE newsletter_id = $1`, [
      subscriptionId,
    ]);

    const deleteResult = await conn?.query(
      `DELETE FROM newsletter WHERE id = $1 RETURNING id`,
      [subscriptionId],
    );

    if (!deleteResult || deleteResult.rowCount === 0) {
      await conn?.query("ROLLBACK");
      return new Response("Failed to unsubscribe", { status: 500 });
    }

    await conn?.query("COMMIT");

    return new Response("Successfully unsubscribed", { status: 200 });
  } catch (error) {
    console.error("Error processing unsubscribe request:", error);
    await conn?.query("ROLLBACK");
    return new Response("Failed to process request", { status: 500 });
  }
}
