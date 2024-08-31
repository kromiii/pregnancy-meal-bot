import { config } from "./config";
import { LineEvent, MessageEvent } from "./types";
import { callOpenAIAPI } from "./openai";

export function sendReply(event: LineEvent): void {
  const replyToken = event.replyToken;
  const url = "https://api.line.me/v2/bot/message/reply";
  const response = handleEvent(event.message);

  UrlFetchApp.fetch(url, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + config.LINE_ACCESS_TOKEN,
    },
    method: "post",
    payload: JSON.stringify({
      replyToken: replyToken,
      messages: [
        {
          type: "text",
          text: response,
        },
      ],
    }),
  });
}

function handleEvent(message: MessageEvent): string {
  let response: string;
  if (message.type !== "image") {
    response = "画像を送信してください。";
  } else {
    const imageContent = getImageContent(message.id);
    response = callOpenAIAPI(imageContent);
  }
  return response;
}

function getImageContent(messageId: string): string {
  const url = `https://api-data.line.me/v2/bot/message/${messageId}/content`;
  const response = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: "Bearer " + config.LINE_ACCESS_TOKEN,
    },
    method: "get",
  });
  
  // バイナリデータを取得
  const binaryData = response.getContent();
  
  // バイナリデータをBase64エンコード
  const base64EncodedData = Utilities.base64Encode(binaryData);
  
  return base64EncodedData;
}

