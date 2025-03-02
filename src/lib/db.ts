import { Pool, PoolClient } from "pg";

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_DB,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl:
    process.env.DB_SSL === "true"
      ? {
          rejectUnauthorized: false,
        }
      : undefined,
};

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private pool: Pool | undefined;

  private constructor() {
    try {
      this.pool = new Pool(config);

      this.pool.on("error", (err) => {
        console.error("Unexpected error on idle client", err);
      });
    } catch (err) {
      console.error(`Failed to initialize database connection pool:`, err);
      this.pool = undefined;
    }
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async query(text: string, params?: any[]): Promise<any> {
    if (!this.pool) {
      throw new Error("Database connection pool not initialized");
    }

    const start = Date.now();
    const result = await this.pool.query(text, params);
    const duration = Date.now() - start;

    if (duration > 200) {
      console.warn("Slow query:", { text, duration, rows: result.rowCount });
    }

    return result;
  }

  public async connect(): Promise<PoolClient> {
    if (!this.pool) {
      throw new Error("Database connection pool not initialized");
    }
    return await this.pool.connect();
  }

  public async end(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
    }
  }
}

export default DatabaseConnection.getInstance();
