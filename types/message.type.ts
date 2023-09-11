export interface Message {
  message: string;
  isUser: boolean;
}

export interface IChatHistoryType {
  chatBody: string;
  timestamp: string;
  userUID: string;
}