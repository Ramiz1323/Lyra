import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateResponse(req, res) {
  await model.invoke("Capital of India?")
  .then((response) => {
    console.log("AI Response:", response.text);
  });
}
