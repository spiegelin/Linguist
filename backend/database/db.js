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

// Add users
const addUser = async (user, email, password) => {
    try {
        // Query for the DB
        const query = `INSERT INTO users (name, email, password) VALUES ('${user}', '${email}', '${password}')`;

        // Send message to the DB
        await db.query(query);

        // db.end();
        return true;
    } catch (err) {
        console.error("Error adding user: ", err);
        // db.end();
        return false;
    }
}

// Check Email
const checkEmail = async (email) => {
    try {
        // Query for the DB
        const query = `SELECT * FROM users WHERE email = '${email}'`;

        // Send message to the DB
        const res = await db.query(query);

        // No se cierra la conexión porque se usa en otro método
        // db.end();

        // Operador terciario, si la longitud de res.rowCount es mayor a 0, retorna true (existe email), sino false
        return res.rowCount > 0 ? true : false;
    } catch (err) {
        console.error("Error checking email: ", err);
        // db.end();
        return null;
    }
};

// Get User
const getUser = async (email) => {
    try {
        // Query for the DB
        const query = `SELECT id, email, password FROM users WHERE email = '${email}'`;

        // Send message to the DB
        const res = await db.query(query);

        // db.end();

        // Regresa el primer objeto de la respuesta
        return res.rows[0];
    } catch (err) {
        console.error("Error getting user: ", err);
        //db.end();
        return null;
    }
};

export { addUser, getUser, checkEmail };

