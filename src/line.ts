import { config } from "./config";
import { LineEvent, MessageEvent } from "./types";
import { callOpenAIAPI } from "./openai";

export async function sendReply(event: LineEvent): Promise<void> {
  const replyToken = event.replyToken;
  const url = "https://api.line.me/v2/bot/message/reply";

  const response = await handleEvent(event.message);
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

async function handleEvent(message: MessageEvent): Promise<string> {
  let response: string;

  if (message.type !== 'image') {
    response = "画像を送信してください。";
  } else {
    const imageContent = getImageContent(message.id);
    response = await callOpenAIAPI(imageContent);
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
  return response.getContentText();
}
