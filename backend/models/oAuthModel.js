import db from "../database/db.js";

const findOrCreate = async (profile, provider) => {
    // profile es el objeto que contiene la información del usuario
    // profile.id es el id de Google/Facebook/Github/LinkedIn
    // provider es el nombre de la red social
    // El switch se encarga de seleccionar la red social correspondiente
    let query;
    let provider_id;
    switch (provider) {
        case 'google':
            query = `SELECT * FROM users WHERE google_id = '${profile.id}'`;
            provider_id = "google_id"
            break;
        case 'facebook':
            query = `SELECT * FROM users WHERE facebook_id = '${profile.id}'`;
            provider_id = "facebook_id"
            break;
        case 'github':
            query = `SELECT * FROM users WHERE github_id = '${profile.id}'`;
            provider_id = "github_id"
            break;
        case 'linkedin':
            query = `SELECT * FROM users WHERE linkedin_id = '${profile.id}'`;
            provider_id = "linkedin_id"
            break;
        default:
            console.error("Provider not found");
            return null;
    }

    
    // Send message to the DB
    try {
        let res = await db.query(query);
        
        try {
            // Si el usuario no existe, se crea y se devuelve
            if (res.rows.length === 0) {
                // github no tiene los mismos fields que google y facebook
                if (provider === 'github') {
                    query = `INSERT INTO users (${provider_id}, first_name, email) VALUES ('${profile.id}', '${profile.displayName}', '${profile.emails[0].value}') RETURNING *`;
                } else {
                    query = `INSERT INTO users (${provider_id}, first_name, last_name, email) VALUES ('${profile.id}', '${profile.name.givenName}', '${profile.name.familyName}', '${profile.emails[0].value}') RETURNING *`;
                }
                res = await db.query(query);
    
                console.log('User created')
                return {
                    ...res.rows[0],
                    isNew: true
                  };
            } 
        } catch (err) {
            console.error("Error creating user: ", err);
            return null;
        }
    
        // Regresa el primer objeto de la respuesta
        console.log('User login')
        return {
            ...res.rows[0],
            isNew: false
          };

    } catch (err) {
        console.error("Error checking user: ", err);
        return null;
    }
}


export default findOrCreate;