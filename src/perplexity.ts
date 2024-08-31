import { config } from "./config";
import { ApiResponse } from "./types";

export function callPerplexityAPI(query: string): string {
  const apiKey = config.PERPLEXITY_APIKEY;
  const apiUrl = "https://api.perplexity.ai/chat/completions";

  const payload = {
    model: "llama-3.1-sonar-small-128k-online",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: query },
    ],
  };

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + apiKey,
    },
    payload: JSON.stringify(payload),
  };

  try {
    const response = UrlFetchApp.fetch(apiUrl, options);
    const result = JSON.parse(response.getContentText()) as ApiResponse;
    return result.choices[0].message.content;
  } catch (error) {
    Logger.log("Error: " + error);
    return "An error occurred while processing your request.";
  }
}
