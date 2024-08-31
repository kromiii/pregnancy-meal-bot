export interface LineEvent {
  replyToken: string;
  message: {
    text?: string;
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
