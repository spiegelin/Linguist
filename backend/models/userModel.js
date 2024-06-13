//UserModel.js
import db from "../database/db.js";

const getAllUsersExceptCurrent = async (userId) => {
  try {
    const res = await db.query(`SELECT * FROM users WHERE id != $1`, [userId]);
    return res.rows;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};

// Get users with the same languages as the current user
const getUsersWithSameLanguage = async (userId) => {
  try {
    // Obtain users with the same languages
    const query = `
      SELECT u.id, u.first_name, u.last_name, u.country, l.language_name
      FROM users u
      JOIN user_languages ul ON u.id = ul.user_id
      JOIN languages l ON ul.language_id = l.id
      WHERE ul.language_id IN (
        SELECT language_id
        FROM user_languages
        WHERE user_id = $1
      )
      AND u.id != $1
      ORDER BY l.language_name;`;

    const res = await db.query(query, [userId]);

    // Create a dictionary with users grouped by language
    // { language: [ { id, first_name, last_name, country, language }, ... ], ... }
    const usersByLanguage = res.rows.reduce((acc, user) => {
      if (!acc[user.language_name]) {
        acc[user.language_name] = [];
      }
      acc[user.language_name].push({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        country: user.country,
        language: user.language_name
      });
      return acc;
    }, {});
    //console.log('Users by language:', usersByLanguage);

    return usersByLanguage;

    // Make the dictionary an object indexed by numbers
    // { 1: [ { id, first_name, last_name, country, language }, ... ], ... }
    /*
    const result = {};
    let index = 1;
    for (const language in usersByLanguage) {
      result[index] = usersByLanguage[language];
      index++;
    }
    console.log('Users with same language:', result);
    return result;
    */
  } catch (err) {
    console.error('Error fetching users with same language:', err);
    throw err;
  }
};

// Get user by the ID retrieved from the cookie
const getUserById = async (userId) => {
  try {
    // Obtain the user and their languages in a single query each
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
    // Add the native language to the user object
    if (user.native_language_id) {
      const native_language = await db.query(`SELECT language_name FROM languages WHERE id = $1`, [user.native_language_id]);
      user.native_language = native_language.rows[0].language_name;
    }
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
    const [native_language, language1, language2, language3] = newLanguages;

     // Map the languages to their IDs
     const getLanguageId = async (languageName) => {
      const result = await db.query(`SELECT id FROM languages WHERE language_name = $1`, [languageName]);
      return result.rows[0] ? result.rows[0].id : null;
    };

    // Get the IDs of the languages (or null if the language is empty)
    // We use Promise.all to run the queries in parallel
    const languageIds = await Promise.all([getLanguageId(language1), getLanguageId(language2), getLanguageId(language3)]);
    const nativeLanguageId = await getLanguageId(native_language);

    // Update the user's fields
    let query = `UPDATE users SET first_name = $1, last_name = $2, country = $3, contact_num = $4, native_language_id = $5 WHERE id = $6`;
    await db.query(query, [firstName, lastName, country, contactNum, nativeLanguageId, userId]);
    

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

const editProfileImage = async (userId, imageBuffer) => {
  try {
    const query = `UPDATE users SET profile_image = $1 WHERE id = $2`;
    await db.query(query, [imageBuffer, userId]);
  
    return true;
  } catch (err) {
    console.error('Error editing profile image:', err);
    return false;
  }
};

const getProfileImage = async (userId) => {
  try {
    const result = await db.query('SELECT profile_image FROM users WHERE id = $1',[userId]);

    if (result.rows.length > 0) {
      return result.rows[0].profile_image;
    }
  } catch (error) {
    console.error('Error fetching profile image in DB:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const getUserNativeLanguage = async (userId) => {
  try {
      const query = `
        SELECT l.language_name 
        FROM users u
        JOIN languages l ON u.native_language_id = l.id
        WHERE u.id = $1
      `;
      const res = await db.query(query, [userId]);

      if (res.rows.length > 0) {
        return res.rows[0].language_name;
      } else {
        throw new Error('Native language not found for user');
      }
    } catch (error) {
      console.error('Error fetching user native language:', error);
      throw new Error('Error fetching user native language');
    }
};

const updatePassword = async (userId, hash) => {
        // Update the user's password
        let query = `UPDATE users SET password = $1 WHERE id = $2`;
        await db.query(query, [hash, userId]);
};


export { getAllUsersExceptCurrent, updatePassword, getUsersWithSameLanguage, getUserNativeLanguage, getUserById, editUser, editProfileImage, getProfileImage };