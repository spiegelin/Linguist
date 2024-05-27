import db from "../database/db.js";

// Add users
const addUser = async (first_name, last_name, country, contact_num, email, password) => {
    try {
        // Query for the DB
        const query = `INSERT INTO users (first_name, last_name, country, contact_num, email, password) VALUES ('${first_name}', '${last_name}', '${country}', '${contact_num}', '${email}', '${password}')`;

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

export { addUser, checkEmail };