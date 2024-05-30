import db from "../database/db.js";

const findOrCreate = async (profile) => {
    // profile es el objeto que contiene la información del usuario
    // profile.id es el id de Google
    let query = `SELECT * FROM users WHERE github_id = '${profile.id}'`;

    // Send message to the DB
    let res = await db.query(query);
    
    // Si el usuario no existe, se crea y se devuelve
    if (res.rows.length === 0) {
        query = `INSERT INTO users (github_id, first_name, email) VALUES ('${profile.id}', '${profile.displayName}', '${profile.emails[0].value}') RETURNING *`;
        res = await db.query(query);

        console.log('User created')
        return res.rows[0];
    }

    // Regresa el primer objeto de la respuesta
    console.log('User login')
    return res.rows[0];
}

export default findOrCreate;