//llmRoutes.js
import express from 'express';
import { testResponse, saveTranslation, messageTranslation, askOpenAI } from '../controllers/llmController.js';
import { getMessageById } from '../models/translationModel.js';
import cookieJwtAuth from '../auth/cookieJwtAuth.js';
import { getUserNativeLanguage } from '../models/userModel.js';

const router = express.Router();

router.post('/traductiondummy', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const response = await testResponse(message);
        res.json({ response });
    } catch (error) {
        console.error('Error handling /traductiondummy request:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/messageTraduction', cookieJwtAuth, async (req, res) => {
    const userId = req.user.user_id;
    const messageId = req.body.messageId;

    if (!messageId || !userId) {
        return res.status(400).json({ error: 'MessageId and UserId are required' });
    }

    try {
        const message = await getMessageById(messageId);
        const nativeLanguage = await getUserNativeLanguage(userId);

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        const response = await messageTranslation(message.body, nativeLanguage);
        const savedTranslation = await saveTranslation(messageId, response);
        res.json({ messageId, response: savedTranslation });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'Error communicating with OpenAI' });
    }
});

router.post('/ask-openai', cookieJwtAuth, async (req, res) => {
    const userId = req.user.user_id;
    const { message } = req.body;

    if (!message || !userId) {
        return res.status(400).json({ error: 'Message and UserId are required' });
    }

    try {
        const nativeLanguage = await getUserNativeLanguage(userId);        
        const response = await askOpenAI(message, nativeLanguage);
        res.json({ response });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'Error communicating with OpenAI' });
    }
});

export default router;
