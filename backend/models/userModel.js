import db from "../database/db.js";

const getAllUsersExceptCurrent = async (userId) => {
  try {
    const res = await db.query(`SELECT * FROM users WHERE id = '${userId}'`);
    return res.rows;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};

// Get user by the ID retrieved from the cookie
const getUserById = async (userId) => {
  try {
    // Obtener el usuario y sus lenguajes en una sola consulta cada uno
    const userQuery = `SELECT * FROM users WHERE id = $1`;
    const userResult = await db.query(userQuery, [userId]);

    const userLanguagesQuery = `
      SELECT ul.language_id, l.language_name
      FROM user_languages ul
      JOIN languages l ON ul.language_id = l.id
      WHERE ul.user_id = $1
    `;
    const userLanguagesResult = await db.query(userLanguagesQuery, [userId]);

    const user = userResult.rows[0];
    const languages = userLanguagesResult.rows.map(row => row.language_name);

    // Rellenar con undefined si el usuario tiene menos de 3 lenguajes
    while (languages.length < 3) {
      languages.push(undefined);
    }

    // Devolver el usuario y los lenguajes (hasta 3)
    return [user, ...languages];
  } catch (err) {
    console.error('Error fetching user:', err);
    throw err;
  }
};


// Edit all possible fields of a user (expects all fields to be filled)
const editUser = async (userId, firstName, lastName, country, contactNum, newLanguages) => {
  try {
    const [language1, language2, language3] = newLanguages;

    // Update the user's fields
    let query = `UPDATE users SET first_name = $1, last_name = $2, country = $3, contact_num = $4 WHERE id = $5`;
    await db.query(query, [firstName, lastName, country, contactNum, userId]);

    // Map the languages to their IDs
    const getLanguageId = async (languageName) => {
      const result = await db.query(`SELECT id FROM languages WHERE language_name = $1`, [languageName]);
      return result.rows[0] ? result.rows[0].id : null;
    };

    const languageIds = await Promise.all([getLanguageId(language1), getLanguageId(language2), getLanguageId(language3)]);

    // Verify if the user already has languages
    query = `SELECT * FROM user_languages WHERE user_id = $1`;
    const res = await db.query(query, [userId]);

    // Update or insert the user's languages
    for (let i = 0; i < languageIds.length; i++) {
      if (languageIds[i]) {
        const existingLanguage = res.rows.find(row => row.language_id === languageIds[i]);
        if (existingLanguage) {
          // Do nothing if it already exists
        } else {
          // Insert if it doesn't exist
          query = `INSERT INTO user_languages (user_id, language_id) VALUES ($1, $2)`;
          await db.query(query, [userId, languageIds[i]]);
        }
      }
    }

    // Delete extra languages if the user has more than the allowed (3)
    const existingLanguageIds = res.rows.map(row => row.language_id);
    const languagesToDelete = existingLanguageIds.filter(id => !languageIds.includes(id));
    for (const languageId of languagesToDelete) {
      query = `DELETE FROM user_languages WHERE user_id = $1 AND language_id = $2`;
      await db.query(query, [userId, languageId]);
    }

    // If everything went well, return true
    return true;
  } catch (err) {
    console.error('Error editing user:', err);
    return false;
  }
};


export { getAllUsersExceptCurrent, getUserById, editUser };