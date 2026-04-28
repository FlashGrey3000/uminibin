import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    host: process.env.PG_HOST
});

export default pool;