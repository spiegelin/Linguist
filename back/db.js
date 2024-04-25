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
/*
try {
    const res = await db.query("SELECT * FROM users");
    console.log(res.rows);
} catch (err) {
    console.error("Error executing query: ", err);
}
*/

// Test
const test = async (body, conversation_id, user_id) => {
    try {
        // Query for the DB
        const query = `INSERT INTO messages (conversation_id, sender_id, body) VALUES (${conversation_id}, ${user_id}, '${body}')`;

        // Send message to the DB
        await db.query(query);

        return true;
    } catch (err) {
        console.error("Error sending message: ", err);
        return false;
    }
    db.end();
}

export default test;


