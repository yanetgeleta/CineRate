import pg from "pg"
import env from "dotenv"
import path from "path";

env.config({ path: path.resolve(process.cwd(), '.env') });

const db = new pg.Pool({
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    host: process.env.DB_HOST
})

export default db;