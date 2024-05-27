import db from "../database/db.js";

const getUserById = async (userId) => {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows[0];
};

const getOrCreateConversation = async (user1Id, user2Id) => {
    let result = await db.query(
        'SELECT * FROM conversations WHERE (user_id1 = $1 AND user_id2 = $2) OR (user_id1 = $2 AND user_id2 = $1)',
        [user1Id, user2Id]
    );
    let conversation = result.rows[0];

    if (!conversation) {
        // Insert the new conversation without the conversation_name
        result = await db.query(
            'INSERT INTO conversations (user_id1, user_id2) VALUES ($1, $2) RETURNING *',
            [user1Id, user2Id]
        );
        conversation = result.rows[0];

        // Generate the conversation_name based on the conversation ID
        const conversationName = `conversation_${conversation.id}`;

        // Update the conversation with the conversation_name
        await db.query(
            'UPDATE conversations SET conversation_name = $1 WHERE id = $2',
            [conversationName, conversation.id]
        );

        // Retrieve the updated conversation
        result = await db.query('SELECT * FROM conversations WHERE id = $1', [conversation.id]);
        conversation = result.rows[0];
    }
    
    return conversation;
};

const saveMessage = async (conversationId, senderId, message) => {
    await db.query(
        'INSERT INTO messages (conversation_id, sender_id, body) VALUES ($1, $2, $3)',
        [conversationId, senderId, message]
    );
};

export {getUserById, getOrCreateConversation, saveMessage}