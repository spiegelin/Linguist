import db from "../database/db.js";

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

export default getUser;