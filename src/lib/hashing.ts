import * as crypto from "crypto";

export function hash(data: string): string | null {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}
