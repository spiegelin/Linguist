//llmController.js
import OpenAI from 'openai';
import { saveTranslationToDB, createMessageTranslation } from '../models/translationModel.js';
import { getUserById, getUserNativeLanguage } from '../models/userModel.js';

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
            { role: 'system', content: 
            `You are a friendly chatbot. you are going to help a user translate a message to ${nativeLanguage}.you talk in ${nativeLanguage}.
            ` },
            { role: 'user', content: `TRANSLATE the message you receive into *${nativeLanguage}*. IN *${nativeLanguage} give a brief context of what the input you recieve means.
             The message of the user is: *${userInput}*
             Dont ask me if I need Anything after, Just transalate the message and give context.
             ` },
        ];

        console.log("openai messageTranslation messages", messages);

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

const askOpenAI = async (userInput, nativeLanguage) => {
    const messages = [
        { role: 'system', content: `EXCLUSIVELY ANSWER IN *${nativeLanguage}*. Answer the answer saying you are "LingüístBot"` },
        { role: 'user', content: userInput },
    ];

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
    });

    const response = completion.choices[0].message.content;
    return response;
};

export { testResponse, messageTranslation, saveTranslation, getUserNativeLanguage, askOpenAI };

