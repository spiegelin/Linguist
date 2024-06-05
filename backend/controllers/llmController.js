//llmController.js
import OpenAI from 'openai';
import { saveTranslationToDB, createMessageTranslation } from '../models/translationModel.js';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function testResponse(userInput){
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

async function messageTranslation(userInput) {
    try {
        const messages = [
            { role: 'system', content: 'Das la traduccion literal de los mensajes que te llegan, además de un breve contexto de como pueden ser usados en conversaciones' },
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

export { testResponse, messageTranslation, saveTranslation };