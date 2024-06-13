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

const askOpenAI = async (userInput, nativeLanguage, userId, conversationRoom) => {

    const conversationHistory = await getMessagesFromConversation(conversationRoom);
    const mappedConversationHistory = conversationHistory.map(message => ({
        sender_id: message.sender_id,
        body: message.body
      }));
    //console.log("mappedConversationHistory", mappedConversationHistory);

    const input_with_context = `
    Here is the context of the conversation with the other user so far:
    ${JSON.stringify(mappedConversationHistory, null, 2)}

    The user who is asking for help has the following details:
    - ID: ${userId}

    The user's question or inquiry you have to help them resolve is:
    ${userInput}

    Please assist the user based on the above information.
    `
    console.log("input_with_context", input_with_context);

    const messages = [
        { role: 'system', content: `You are LinguistBot, a conversational assistant specialized in helping users with their language learning. 
        Respond to users in their native language: *${nativeLanguage}* (except when an answer requires something in the language they are learning).
        Your goal is to provide clear explanations and responses according to the users input/question.
        Assist users in real-time conversations by suggesting appropriate responses, checking if their messages make sense, and correcting grammar or spelling mistakes.
        Always display patience and encouragement, and use relevant cultural examples and references whenever possible.` },
        { role: 'user', content: input_with_context },
    ];

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
    });

    const response = completion.choices[0].message.content;
    return response;
};

export { testResponse, messageTranslation, saveTranslation, getUserNativeLanguage, askOpenAI };

