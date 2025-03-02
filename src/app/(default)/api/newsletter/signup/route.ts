import conn from "@/src/lib/db";
import { cryptService } from "@/src/lib/crypt";
import { checkEmailRegEx } from "@/src/lib/validation";
import { emailService } from "@/src/lib/emailService";
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

  const emailHash = cryptService.hash(email);
  if (!emailHash) {
    return new Response("Something went wrong!", { status: 500 });
  }

  try {
    let newsletter: QueryResult | undefined = await conn?.query(
      `SELECT id, verified FROM newsletter WHERE hash = $1 LIMIT 1`,
      [emailHash],
    );

    if (!newsletter) {
      return new Response("Couldn't fetch newsletter table!", { status: 500 });
    }

    if (
      newsletter.rows !== null &&
      newsletter.rows.length > 0 &&
      newsletter.rows[0].verified
    ) {
      return new Response(
        "This email is already subscribed to our newsletter",
        { status: 403 },
      );
    }

    if (
      newsletter.rows !== null &&
      newsletter.rows.length > 0 &&
      !newsletter.rows[0].verified
    ) {
      const verificationToken = cryptService.createVerificationToken();

      const exists = await conn?.query(
        `SELECT newsletter_id FROM verification WHERE newsletter_id = $1`,
        [newsletter.rows[0].id],
      );
      if (!exists) {
        return new Response("Something wen't wrong!", { status: 500 });
      }

      if (exists.rows[0].newsletter_id) {
        await conn?.query(
          `UPDATE verification SET token = $1 WHERE newsletter_id = $2`,
          [verificationToken, newsletter.rows[0].id],
        );
      }

      try {
        await sendVerificationEmail(email, verificationToken);
        return new Response(
          "Verification email sent! Please check your inbox.",
          { status: 200 },
        );
      } catch (emailErr) {
        console.error("Failed to send verification email:", emailErr);
        return new Response(
          "Failed to send verification email. Please try again later.",
          { status: 500 },
        );
      }
    }

    const cipherText = cryptService.encrypt(email);
    if (!cipherText) {
      return new Response("Something went wrong with encryption!", {
        status: 500,
      });
    }

    const verificationToken = cryptService.createVerificationToken();

    const newsletterInsert = await conn?.query(
      `INSERT INTO newsletter (email, hash, extensive, verified) 
       VALUES ($1, $2, $3, $4)`,
      [cipherText, emailHash, extensive, false],
    );

    newsletter = await conn?.query(
      `SELECT id FROM newsletter WHERE hash = $1`,
      [emailHash],
    );

    if (!newsletter || !newsletter.rowCount || newsletter.rowCount === 0) {
      console.error("Couldn't find inserted newsletter");
      return new Response("Something wen't wrong!", {
        status: 500,
      });
    }

    if (
      !newsletterInsert ||
      !newsletterInsert.rowCount ||
      newsletterInsert.rowCount === 0
    ) {
      console.error("Couldn't insert into newsletter table!");
      return new Response("Something wen't wrong!", {
        status: 500,
      });
    }

    const verificationInsert = await conn?.query(
      `INSERT INTO verification (newsletter_id, token) 
       VALUES ($1, $2)`,
      [newsletter.rows[0].id, verificationToken],
    );

    if (!verificationInsert) {
      console.error("Couldn't insert into verification table!");
      return new Response("Something wen't wrong!", {
        status: 500,
      });
    }

    if (
      verificationInsert.rowCount !== null &&
      verificationInsert.rowCount > 0
    ) {
      try {
        await sendVerificationEmail(email, verificationToken);
        return new Response(
          "Verification email sent! Please check your inbox.",
        );
      } catch (emailErr) {
        console.error("Failed to send verification email:", emailErr);
        try {
          await conn?.query(`DELETE FROM newsletter WHERE hash = $1`, [
            emailHash,
          ]);
          return new Response(
            "Failed to send verification email. Please try again later.",
            { status: 500 },
          );
        } catch (deleteErr) {
          console.error(
            "Failed to remove database entry after email failure:",
            deleteErr,
          );
          return new Response(
            "Newsletter signup failed. Please try again later.",
            { status: 500 },
          );
        }
      }
    }

    return new Response("Newsletter signup failed. Please try again later.", {
      status: 500,
    });
  } catch (err) {
    console.error(err);
    return new Response("Newsletter signup failed. Please try again later.", {
      status: 500,
    });
  }
}

async function sendVerificationEmail(
  email: string,
  token: string,
): Promise<void> {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://zendoc.io"}/newsletter/verify?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Zendoc Newsletter Subscription</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Golos+Text:wght@400..900&display=swap');
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Golos Text', Arial, sans-serif; background-color: #f5f5f5; color: #333333;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border: 0;">
        <tr>
          <td style="padding: 20px 0; text-align: center; background-color: #f5f5f5;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <!-- Header with Logo -->
              <tr>
                <td style="padding: 40px 30px; text-align: center; background-color: #FF634D;">
                  <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Verify Your Email Address</h1>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td style="padding: 30px; background-color: #ffffff;">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                    <tr>
                      <td>
                        <p style="margin: 0 0 15px; font-size: 16px; line-height: 24px;">Hello,</p>
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px;">Thank you for signing up for the Zendoc newsletter! To complete your subscription, please verify your email address by clicking the button below:</p>
                        
                        <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin: 30px 0;">
                          <tr>
                            <td style="text-align: center;">
                              <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #FF634D; color: white; text-decoration: none; border-radius: 4px; font-weight: 500; font-size: 16px;">Verify My Email Address</a>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 0 0 15px; font-size: 16px; line-height: 24px;">If the button doesn't work, you can also copy and paste the following link into your browser:</p>
                        <p style="margin: 0 0 20px; font-size: 14px; line-height: 22px; background-color: #f8f8f8; padding: 10px; border-radius: 4px; word-break: break-all;">${verificationUrl}</p>
                        
                        <p style="margin: 20px 0 0; font-size: 16px; line-height: 24px;">If you didn't sign up for the Zendoc newsletter, you can safely ignore this email.</p>
                        
                        <p style="margin: 20px 0 0; font-size: 16px; line-height: 24px;">Best regards,<br>The Zendoc Team</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 20px 30px; background-color: #f8f8f8; border-top: 1px solid #eeeeee; text-align: center; color: #666666;">
                  <p style="margin: 0 0 10px; font-size: 12px; line-height: 18px;">© ${new Date().getFullYear()} Merckel u. Witzdam GbR. All rights reserved.</p>
                  <p style="margin: 10px 0 0; font-size: 12px; line-height: 18px; color: #999999;">
                    Merckel u. Witzdam GbR, Im Winkel 23, 45896 Gelsenkirchen, Germany
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await emailService.sendEmail({
    to: email,
    subject: "Verify Your Zendoc Newsletter Subscription",
    html: html,
  });
}
