//llmController.js
import OpenAI from 'openai';
import { saveTranslationToDB, createMessageTranslation } from '../models/translationModel.js';
import { getUserById, getUserNativeLanguage } from '../models/userModel.js';
import { getMessagesFromConversation } from '../models/socketModel.js';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function testResponse(userInput) {
    try {
        const messages = [
            { role: 'system', content: 'You are a friendly chatbot.' },
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
            { role: 'system', content: `You are a friendly chatbot that helps users translate messages into ${nativeLanguage}. Please communicate in ${nativeLanguage}.` },
            { role: 'user', content: `Translate the following message into ${nativeLanguage}. Provide a brief context of the message in ${nativeLanguage}. Do not ask any further questions or provide additional information. The user's message is: "${userInput}"` },
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

const askOpenAI = async (userInput, nativeLanguage, userId, conversationRoom) => {
    const conversationHistory = await getMessagesFromConversation(conversationRoom);
    const mappedConversationHistory = conversationHistory.map(message => ({
        sender_id: message.sender_id,
        body: message.body
    }));

    const inputWithContext = `
        Here is the context of the conversation so far:
        ${JSON.stringify(mappedConversationHistory, null, 2)}

        The user asking for help has the following details:
        - ID: ${userId}

        The user's question or inquiry is:
        "${userInput}"

        Please assist the user based on the above information.
    `;
    console.log("input_with_context", inputWithContext);

    const messages = [
        { role: 'system', content: `You are LinguistBot, a conversational assistant specialized in helping users with their language learning. 
        Respond to users in their native language: ${nativeLanguage} (except when an answer requires something in the language they are learning).
        Your goal is to provide clear explanations and responses according to the user's input/question.
        Assist users in real-time conversations by suggesting appropriate responses, checking if their messages make sense, and correcting grammar or spelling mistakes.
        Always display patience and encouragement, and use relevant cultural examples and references whenever possible.` },
        { role: 'user', content: inputWithContext },
    ];

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
    });

    const response = completion.choices[0].message.content;
    return response;
};

export { testResponse, messageTranslation, saveTranslation, getUserNativeLanguage, askOpenAI };
