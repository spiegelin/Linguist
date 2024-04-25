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


// DB query
try {
    const res = await db.query("SELECT * FROM users");
    console.log(res.rows);
} catch (err) {
    console.error("Error executing query: ", err);
}


db.end();
