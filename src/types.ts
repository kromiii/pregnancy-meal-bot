export interface LineEvent {
  replyToken: string;
  message: MessageEvent,
  source: {
    userId: string;
  };
}

export interface MessageEvent {
  type: string;
   id: string;
   contentProvider: {
     type: string;
   };
   text: string;
}
