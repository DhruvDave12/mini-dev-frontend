"use client";
import { IChatContextProps } from "@/types/context.type";
import { Message } from "@/types/message.type";
import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "@/services/axiosInstance";

export const ChatContext = createContext<IChatContextProps>({
  previousChats: [],
  getPreviousChats: async () => {},
  queryMiniDev: async () => {},
  history: [],
  loading: false,
  queryLoading: false,
});

interface IChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider = ({ children }: IChatProviderProps) => {
  const [previousChats, setPreviousChats] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [queryLoading, setQueryLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);

  const getAllChats = async () => {
    try {
      const token = localStorage.getItem("@miniDev/token");
      const res = await axiosInstance.get("/user/get/chats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200 || res.status === 201) {
        const chats: string[] = [];
        res.data.forEach((chat: any) => {
          if (chat.chatBody.query) {
            chats.push(chat.chatBody.query);
          }
        });
        setHistory(chats);
      }
    } catch (err) {
      console.log("ERROR WHILE GETTING ALL CHATS: ", err);
    }
  };

  useEffect(() => {
    getAllChats();
  }, [loading]);

  const queryMiniDev = async (message: string) => {
    setPreviousChats((prev) => [
      ...prev,
      { message, isUser: true },
      { message: "", isUser: false },
    ]);
    setQueryLoading(true);
    setLoading(true);
    try {
      const token = localStorage.getItem("@miniDev/token");
      const res = await axiosInstance.post(
        "/data-ingestor/query",
        {
          query: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200 || res.status === 201) {
        const data = res.data;
        const message: Message = {
          message: data.message,
          isUser: false,
          // TODO -> CAN ADD THE TIMESTAMP HERE TO SHOW THE TIME OF MESSAGE
        };
        setPreviousChats((prev) => {
          prev.pop();
          return [...prev, message];
        });
      }
    } catch (error) {
      console.log("ERROR WHILE QUERYING MINIDEV: ", error);
    } finally {
      setQueryLoading(false);
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        previousChats,
        getPreviousChats: getAllChats,
        queryMiniDev,
        history,
        loading,
        queryLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
