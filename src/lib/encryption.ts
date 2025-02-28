import * as crypto from "crypto";

export function encrypt(data: string): string | null {
  if (!process.env.ENCYRPTION_KEY || process.env.ENCRYPTION_KEY === "") {
    return null;
  }

  const key = Buffer.from(process.env.ENCYRPTION_KEY.trim(), "hex");

  const iv = crypto.randomBytes(16);
  const algorithm = "aes-256-cbc";
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let ec_data = cipher.update(data, "utf8", "hex");
  ec_data += cipher.final("hex");
  return `${iv.toString("hex")}:${ec_data}`;
}

export function decrypt(data: string): string | null {
  if (!process.env.ENCYRPTION_KEY || process.env.ENCRYPTION_KEY === "") {
    return null;
  }

  const [iv, ciphertext] = data.split(":");
  if (!iv || !ciphertext) {
    return null;
  }

  const key = Buffer.from(process.env.ENCYRPTION_KEY.trim(), "hex");

  const algorithm = "aes-256-cbc";
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let clearText = decipher.update(ciphertext, "hex", "utf8");
  clearText += decipher.final("utf8");
  return clearText;
}
