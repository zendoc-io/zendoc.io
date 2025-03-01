import conn from "@/src/lib/db";
import { encrypt } from "@/src/lib/encryption";
import { hash } from "@/src/lib/hashing";
import { checkEmailRegEx } from "@/src/lib/validation";
import { QueryResult } from "pg";

interface Body {
  email: string;
  extensive: boolean;
}

export async function POST(req: Request) {
  if (req.headers.get("content-type") !== "application/json") {
    return new Response("Invalid request body!", { status: 400 });
  }
  let body;
  try {
    body = (await req.json()) as Body;
  } catch (err) {
    console.error(err);
    return new Response("Invalid request body!", { status: 400 });
  }
  const { email, extensive } = body;
  if (!email || extensive === undefined) {
    return new Response("Invalid request body!", { status: 400 });
  }

  if (!checkEmailRegEx(email)) {
    return new Response("Invalid email address!", { status: 400 });
  }

  const emailHash = hash(email);
  if (!emailHash) {
    return new Response("Something wen't wrong!", { status: 500 });
  }

  try {
    let response: QueryResult | undefined = await conn?.query(
      `SELECT id FROM newsletter WHERE hash = $1 LIMIT 1`,
      [emailHash],
    );
    if (!response) {
      return new Response("Couldn't fetch newsletter table!", { status: 500 });
    }
    if (response.rowCount !== null && response.rowCount > 0) {
      return new Response("Already signed-up for newsletter", { status: 403 });
    }

    const cipherText = encrypt(email);
    if (!cipherText) {
      return new Response("Something wen't wrong!", { status: 500 });
    }

    response = await conn?.query(
      `INSERT INTO newsletter (email, hash, extensive) VALUES ($1, $2, $3)`,
      [cipherText, emailHash, extensive],
    );
    if (!response) {
      return new Response("Couldn't insert into newsletter table!", {
        status: 500,
      });
    }
    if (response.rowCount !== null && response.rowCount > 0) {
      return new Response("Newsletter sign-up successfull!");
    }
  } catch (err) {
    console.error(err);
    return new Response("Newsletter sign-up failed!", {
      status: 500,
    });
  }
}
