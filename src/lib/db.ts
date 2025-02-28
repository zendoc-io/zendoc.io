import { Pool } from "pg";

let conn: Pool | undefined;

if (!conn) {
  try {
    conn = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_DB,
    });
  } catch (err) {
    console.error(`Something wen't wrong: ${err}`);
  }
}

export default conn;
