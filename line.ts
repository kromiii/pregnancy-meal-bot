import { config } from './config';
import { LineEvent } from './types';
import { callPerplexityAPI } from './services/perplexity';

export function sendReply(event: LineEvent): void {
  const replyToken = event.replyToken;
  const userMessage = event.message.text;
  const url = 'https://api.line.me/v2/bot/message/reply';

  let response = '';
  if (userMessage === undefined) {
    response = 'テキストメッセージでお願いします';
  } else {
    response = callPerplexityAPI(userMessage);
  }

  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + config.LINE_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text': response,
      }]
    })
  });
}
