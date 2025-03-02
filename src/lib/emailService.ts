import * as nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    if (!this.transporter) {
      console.error("Email transporter not configured");
      throw new Error("Email service not configured");
    }

    try {
      await this.transporter.sendMail({
        from: `"Zendoc" <${process.env.SMTP_FROM?.trim()}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, ""),
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      throw new Error("Failed to send email");
    }
  }

  async sendVerificationEmail(
    email: string,
    extensive: boolean,
    token: string,
  ): Promise<void> {
    try {
      const verificationUrl = `https://zendoc.io/api/newsletter/verify?token=${token}}`;
      const subscriptionType = extensive ? "comprehensive" : "release-only";

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm Your Zendoc Newsletter Subscription</title>
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
                      <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Confirm Your Zendoc Newsletter Subscription</h1>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 30px; background-color: #ffffff;">
                      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                          <td>
                            <p style="margin: 0 0 15px; font-size: 16px; line-height: 24px;">Hello,</p>
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px;">Thank you for your interest in the Zendoc newsletter. Please confirm your subscription by clicking the button below:</p>
                            
                            <!-- Verification Button -->
                            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin: 30px 0;">
                              <tr>
                                <td style="text-align: center;">
                                  <div>
                                    <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #FF634D; color: white; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 16px;">Confirm My Subscription</a>
                                  </div>
                                  <p style="margin: 15px 0 0; font-size: 13px; color: #666;">If the button doesn't work, copy and paste this link into your browser:</p>
                                  <p style="margin: 5px 0 0; font-size: 12px; color: #999; word-break: break-all;">${verificationUrl}</p>
                                </td>
                              </tr>
                            </table>
                            
                            <div style="background-color: #f8f8f8; border-left: 4px solid #FF634D; padding: 15px; margin-bottom: 20px; border-radius: 0 4px 4px 0;">
                              <p style="margin: 0; font-size: 16px; color: #333;">You've selected our <strong style="color: #FF634D;">${subscriptionType}</strong> newsletter subscription.</p>
                            </div>
                            
                            <p style="margin: 20px 0 0; font-size: 16px; line-height: 24px;">This verification link will expire in 24 hours. If you did not request this subscription, you can simply ignore this email.</p>
                            
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

      await this.sendEmail({
        to: email,
        subject: "Confirm Your Zendoc Newsletter Subscription",
        html: html,
      });
    } catch (error) {
      console.error("Failed to send verification email:", error);
      throw new Error("Failed to send verification email");
    }
  }

  async sendNewsletterConfirmation(
    email: string,
    extensive: boolean,
  ): Promise<void> {
    try {
      const subscriptionType = extensive ? "comprehensive" : "release-only";

      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Zendoc Newsletter</title>
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
                    <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Welcome to Zendoc Newsletter</h1>
                  </td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                  <td style="padding: 30px; background-color: #ffffff;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                      <tr>
                        <td>
                          <p style="margin: 0 0 15px; font-size: 16px; line-height: 24px;">Hello,</p>
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px;">Thank you for subscribing to the Zendoc newsletter! We're excited to keep you informed about our platform designed to automate and streamline your infrastructure documentation.</p>
                          
                          <div style="background-color: #f8f8f8; border-left: 4px solid #FF634D; padding: 15px; margin-bottom: 20px; border-radius: 0 4px 4px 0;">
                            <p style="margin: 0; font-size: 16px; color: #333;">You've selected our <strong style="color: #FF634D;">${subscriptionType}</strong> newsletter subscription.</p>
                          </div>
                          
                          <p style="margin: 0 0 15px; font-size: 16px; line-height: 24px;">Here's what you can expect to receive from us:</p>
                          
                          ${
                            extensive
                              ? `
                          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 20px;">
                            <tr>
                              <td style="padding: 10px; background-color: #FFF8F7; border-radius: 4px;">
                                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                                  <tr>
                                    <td style="padding: 5px 10px; vertical-align: top; width: 24px;">
                                      <div style="width: 18px; height: 18px; background-color: #30D158; border-radius: 50%;"></div>
                                    </td>
                                    <td style="padding: 5px 10px;">
                                      <p style="margin: 0; font-size: 15px;">Release notifications and updates</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 5px 10px; vertical-align: top; width: 24px;">
                                      <div style="width: 18px; height: 18px; background-color: #FF9F0A; border-radius: 50%;"></div>
                                    </td>
                                    <td style="padding: 5px 10px;">
                                      <p style="margin: 0; font-size: 15px;">Feature announcements and previews</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 5px 10px; vertical-align: top; width: 24px;">
                                      <div style="width: 18px; height: 18px; background-color: #FF634D; border-radius: 50%;"></div>
                                    </td>
                                    <td style="padding: 5px 10px;">
                                      <p style="margin: 0; font-size: 15px;">Community updates and events</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 5px 10px; vertical-align: top; width: 24px;">
                                      <div style="width: 18px; height: 18px; background-color: #E53935; border-radius: 50%;"></div>
                                    </td>
                                    <td style="padding: 5px 10px;">
                                      <p style="margin: 0; font-size: 15px;">Tips and best practices for documentation</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          `
                              : `
                          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 20px;">
                            <tr>
                              <td style="padding: 10px; background-color: #FFF8F7; border-radius: 4px;">
                                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                                  <tr>
                                    <td style="padding: 5px 10px; vertical-align: top; width: 24px;">
                                      <div style="width: 18px; height: 18px; background-color: #30D158; border-radius: 50%;"></div>
                                    </td>
                                    <td style="padding: 5px 10px;">
                                      <p style="margin: 0; font-size: 15px;">Major release notifications</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 5px 10px; vertical-align: top; width: 24px;">
                                      <div style="width: 18px; height: 18px; background-color: #FF634D; border-radius: 50%;"></div>
                                    </td>
                                    <td style="padding: 5px 10px;">
                                      <p style="margin: 0; font-size: 15px;">Critical feature announcements</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          `
                          }
                          
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px;">Looking for more ways to get involved?</p>
                          
                          <!-- Social Links -->
                          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; text-align: center; margin-bottom: 20px;">
                            <tr>
                              <td style="padding: 0 10px;">
                                <a href="https://github.com/zendoc-io" style="display: inline-block; padding: 8px 16px; background-color: #FF634D; color: white; text-decoration: none; border-radius: 4px; font-weight: 500; margin: 5px; font-size: 14px;">GitHub</a>
                              </td>
                              <td style="padding: 0 10px;">
                                <a href="https://discord.gg/RSpKEwDdeA" style="display: inline-block; padding: 8px 16px; background-color: #FF634D; color: white; text-decoration: none; border-radius: 4px; font-weight: 500; margin: 5px; font-size: 14px;">Discord</a>
                              </td>
                              <td style="padding: 0 10px;">
                                <a href="https://www.reddit.com/r/Zendoc/" style="display: inline-block; padding: 8px 16px; background-color: #FF634D; color: white; text-decoration: none; border-radius: 4px; font-weight: 500; margin: 5px; font-size: 14px;">Reddit</a>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="margin: 25px 0 0; font-size: 16px; line-height: 24px;">If you have any questions, feel free to contact us at <a href="mailto:contact@zendoc.io" style="color: #FF634D; text-decoration: none; font-weight: 500;">contact@zendoc.io</a>.</p>
                          
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
                    <p style="margin: 0; font-size: 12px; line-height: 18px;">
                      If you didn't subscribe to this newsletter, please 
                      <a href="https://zendoc.io/newsletter/unsubscribe" style="color: #FF634D; text-decoration: none; font-weight: 500;">unsubscribe here</a>.
                    </p>
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

      await this.sendEmail({
        to: email,
        subject: "Welcome to Zendoc Newsletter",
        html: html,
      });
    } catch (err) {
      console.error("Sending welcome email failed: ", err);
    }
  }
}

export const emailService = new EmailService();
