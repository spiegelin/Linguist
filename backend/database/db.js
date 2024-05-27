import "dotenv/config"
import pg from "pg";

// DB connection
const db = new pg.Client({
    user: process.env.DB_USER,
    host: "localhost",
    database: "linguist",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });


db.connect();

export default db;