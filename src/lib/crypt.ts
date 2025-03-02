import * as crypto from "crypto";

export class CryptService {
  constructor() {}

  encrypt(data: string): string | null {
    if (!process.env.ENCRYPTION_KEY || process.env.ENCRYPTION_KEY === "") {
      return null;
    }

    const key = Buffer.from(process.env.ENCRYPTION_KEY.trim(), "hex");

    const iv = crypto.randomBytes(16);
    const algorithm = "aes-256-cbc";
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let ec_data = cipher.update(data, "utf8", "hex");
    ec_data += cipher.final("hex");
    return `${iv.toString("hex")}:${ec_data}`;
  }

  decrypt(data: string): string | null {
    if (!process.env.ENCRYPTION_KEY || process.env.ENCRYPTION_KEY === "") {
      return null;
    }

    const splitData = data.trim().split(":");
    if (splitData.length === 0) {
      return null;
    }

    const key = Buffer.from(process.env.ENCRYPTION_KEY.trim(), "hex");
    const iv = Buffer.from(splitData[0].trim(), "hex");

    const algorithm = "aes-256-cbc";
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let clearText = decipher.update(splitData[1], "hex", "utf8");
    clearText += decipher.final("utf8");
    return clearText;
  }

  hash(data: string): string | null {
    const hash = crypto.createHash("sha256");
    hash.update(data);
    return hash.digest("hex");
  }

  createVerificationToken(): string {
    return crypto.randomBytes(16).toString("hex");
  }
}

export const cryptService = new CryptService();
