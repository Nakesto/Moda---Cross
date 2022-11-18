import React, { createContext } from "react";
import { User } from "../pages/AddChat";

export type ChatContext = {
  roomChat: User[];
  activeMessage: [];
};

const initialValue: ChatContext = {
  roomChat: [],
  activeMessage: [],
};

const ChatContext = createContext(initialValue);

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChatContext.Provider value={initialValue}>{children}</ChatContext.Provider>
  );
};

export { Provider };
