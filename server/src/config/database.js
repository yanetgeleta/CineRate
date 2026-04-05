import pg from "pg";
import env from "dotenv";
import path from "path";

env.config({ path: path.resolve(process.cwd(), ".env") });
const isProduction = process.env.NODE_ENV === "production";

const db = new pg.Pool({
  // Use the connection string from .env
  connectionString: process.env.DATABASE_URL,
  // Neon requires SSL in production. This setting allows it.
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

export default db;
