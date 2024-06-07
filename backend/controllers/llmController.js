//llmController.js
import OpenAI from 'openai';
import { saveTranslationToDB, createMessageTranslation } from '../models/translationModel.js';
import { getUserById } from '../models/userModel';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function testResponse(userInput) {
    try {
        const messages = [
            { role: 'system', content: 'Eres un chatbot amigable.' },
            { role: 'user', content: userInput },
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
        });

        const response = completion.choices[0].message.content;
        return response;

    } catch (error) {
        console.error('Error during OpenAI API request:', error);
        throw new Error('Error communicating with OpenAI');
    }
}

async function messageTranslation(userInput, nativeLanguage) {
    try {
        const messages = [
            { role: 'system', content: `Das la traducción literal de los mensajes que te llegan al ${nativeLanguage}, además de un breve contexto de cómo pueden ser usados en conversaciones` },
            { role: 'user', content: userInput },
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
        });

        const response = completion.choices[0].message.content;
        return response;

    } catch (error) {
        console.error('Error during OpenAI API request:', error);
        throw new Error('Error communicating with OpenAI');
    }
}

async function saveTranslation(messageId, translatedText) {
    try {
        const translationId = await saveTranslationToDB(translatedText);
        await createMessageTranslation(messageId, translationId);
        return { translationId, translatedText };
    } catch (error) {
        console.error('Error saving translation:', error);
        throw new Error('Error saving translation to the database');
    }
}

async function getUserNativeLanguage(userId) {
    try {
        const user = await getUserById(userId);
        if (user && user.native_language_id) {
            return user.native_language_id;
        } else {
            throw new Error('User native language not found');
        }
    } catch (error) {
        console.error('Error fetching user native language:', error);
        throw new Error('Error fetching user native language');
    }
}

export { testResponse, messageTranslation, saveTranslation, getUserNativeLanguage };

