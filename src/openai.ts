import OpenAI from "openai";
import { config } from "./config";

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY || undefined,
});

export async function callOpenAIAPI(imageContent: string): Promise<string> {
  const prompt = `あなたは妊婦さんに寄り添って食事の管理をするサポーターです。
入力された画像に基づいて以下の返答をしてください。
1. 画像に写っている食べ物をリストアップしてください
2. それぞれについて、妊娠中に食べて良いかどうかを判断してください
3. レスポンスはマークダウン形式を使わず、テキスト形式で出力してください`;

  try {
    const response = await openai.chat.completions.create({
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
    });

    return response.choices[0].message.content || "応答内容がありません。";
  } catch (error) {
    console.error("Error:", error);
    return "リクエストの処理中にエラーが発生しました。";
  }
}
