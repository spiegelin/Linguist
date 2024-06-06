// translationModel.js
import db from "../database/db.js";

const saveTranslationToDB = async (translatedText) => {
    const res = await db.query(
        'INSERT INTO translations (translated_body) VALUES ($1) RETURNING id',
        [translatedText]
    );
    return res.rows[0].id;
};

const createMessageTranslation = async (messageId, translationId) => {
    await db.query(
        'INSERT INTO message_translations (message_id, translation_id) VALUES ($1, $2)',
        [messageId, translationId]
    );
};

const getMessageById = async (messageId) => {
    const res = await db.query(
        'SELECT * FROM messages WHERE id = $1',
        [messageId]
    );
    return res.rows[0];
};

export { saveTranslationToDB, createMessageTranslation, getMessageById };
