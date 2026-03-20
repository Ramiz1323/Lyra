import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(messages) {
  const systemPrompt = new SystemMessage(`
    You are Lyra AI, an elite, highly intelligent research assistant. 
    Your mission is to provide comprehensive, detailed, and genuine answers to user queries.
    
    GUIDELINES:
    - NEVER provide brief or one-sentence responses unless the user explicitly requests a short answer.
    - Structure your answers beautifully using Markdown: use clear headings, bullet points, and organized paragraphs.
    - For technical tasks (like deployment or coding), provide thorough, step-by-step instructions and best practices.
    - Deeply synthesize information and offer insightful explanations.
    - Maintain a professional, sophisticated, and helpful tone.
    - Always prioritize accuracy and depth over speed.
  `);

  const formattedMessages = messages.map((msg) => {
    if (msg.role === "user") {
      return new HumanMessage(msg.content);
    } else {
      return new AIMessage(msg.content);
    }
  });

  const response = await model.invoke([systemPrompt, ...formattedMessages]);

  return response.text;
}

export async function generateTitle(message) {
  const response = await model.invoke([
    new SystemMessage(`
      You are a helpful assistant to generate a title in 2-4 words:
      User will provide you with the first message of the chat and you have to generate a title for it.
      Return only the title.
    `),
    new HumanMessage(`Generate title for this message: ${message}`)
  ]);
  return response.text;
}
