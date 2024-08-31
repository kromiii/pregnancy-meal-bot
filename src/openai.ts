import { config } from "./config";

export function callOpenAIAPI(imageContent: string): string {
  const API_URL = 'https://api.openai.com/v1/chat/completions';

  const prompt = `あなたは妊婦さんに寄り添って食事の管理をするサポーターです。
入力された画像に基づいて以下の返答をしてください。
1. 画像に写っている食べ物をリストアップしてください
2. それぞれについて、妊娠中に食べて良いかどうかを判断してください
3. レスポンスはマークダウン形式を使わず、テキスト形式で出力してください`;

  const payload = {
    model: "gpt-4o",
    messages: [
      { role: "system", content: prompt },
      {
        role: "user",
        content: [
          { type: "text", text: "この画像について分析してください。" },
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${imageContent}` },
          },
        ],
      },
    ],
    max_tokens: 4096,
  };

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    'method': 'post',
    'contentType': 'application/json',
    'headers': {
      'Authorization': `Bearer ${config.OPENAI_API_KEY}`
    },
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true
  };

  try {
    const response = UrlFetchApp.fetch(API_URL, options);
    const responseCode = response.getResponseCode();
    
    if (responseCode === 200) {
      const responseBody = JSON.parse(response.getContentText());
      return responseBody.choices[0].message.content || "応答内容がありません。";
    } else {
      console.error("Error: HTTP status " + responseCode);
      return "APIリクエストが失敗しました。";
    }
  } catch (error) {
    console.error("Error:", error);
    return "リクエストの処理中にエラーが発生しました。";
  }
}
