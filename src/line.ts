import { config } from "./config";
import { LineEvent } from "./types";
import { callPerplexityAPI } from "./perplexity";

export function sendReply(event: LineEvent): void {
  const replyToken = event.replyToken;
  const messageType = event.message.type;
  const url = "https://api.line.me/v2/bot/message/reply";

  let response = "";

  if (messageType !== "image") {
    response = "画像を送信してください。";
  } else {
    const imageContent = getImageContent(event.message.id);
    response = callPerplexityAPI(imageContent);
  }

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
