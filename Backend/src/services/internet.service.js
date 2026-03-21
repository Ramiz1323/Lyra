import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export const searchInternet = async ({ query }) =>{
    return await tvly.search(query, {
        max_results: 5,
        searchDepth: "basic"
    });
}