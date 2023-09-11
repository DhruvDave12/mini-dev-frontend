import { Message } from "./message.type";
import { IUserProps } from "./user.type";

export interface IAuthContextProps {
  user: IUserProps | null;
  signInWithGoogle: () => void;
  signOut: () => void;
}

export interface IChatContextProps {
  previousChats: Message[];
  queryMiniDev: (message: string) => Promise<void>;
  getPreviousChats: () => Promise<void>;
  history: string[];
  loading: boolean;
  queryLoading: boolean;
}
