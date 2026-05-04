import { Pool } from "pg";

const isProd = process.env.NODE_ENV === "prod";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});

export default pool;