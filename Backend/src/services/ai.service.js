import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage,AIMessage } from "@langchain/core/messages";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateResponse(message) {
  const response = await model.invoke(message.map((msg)=>{
    if(msg.role === "user"){
      return new HumanMessage(msg.content);
    }
    else{
      return new AIMessage(msg.content);
    }
  }));

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
