export interface LineEvent {
  replyToken: string;
  message: {
    type: string;
    id: string;
    contentProvider: {
      type: string;
    };
  };
  source: {
    userId: string;
  };
}

export interface ApiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}
