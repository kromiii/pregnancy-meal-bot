import { config } from "./config";
import { ApiResponse } from "./types";

export function callPerplexityAPI(query: string): string {
  const apiKey = config.PERPLEXITY_APIKEY;
  const apiUrl = "https://api.perplexity.ai/chat/completions";

  const prompt = 
  `
  あなたは妊婦さんに寄り添って食事の管理をするサポーターです。
  入力された画像に基づいて以下の返答をしてください。
  1. 画像に写っている食べ物をリストアップしてください
  1. それぞれについて、妊娠中に食べて良いかどうかを判断してください
  1. レスポンスはマークダウン形式を使わず、テキスト形式で出力してください
  `

  const payload = {
    model: "llama-3.1-sonar-small-128k-online",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: "添付した画像の食事を食べようと思っています。妊娠中に食べて良いか判定してください" },
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
