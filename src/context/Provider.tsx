import React, { createContext, useState } from "react";
import { User } from "../pages/AddChat";

export type ChatContext = {
  roomChat: User[];
  activeMessage: [];
  addRoomChat: () => void;
};

const initialValue: ChatContext = {
  roomChat: [],
  activeMessage: [],
  addRoomChat: () => {},
};

const ChatContext = createContext(initialValue);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [init, setInit] = useState(initialValue);

  const activeRoomChat = (data: User[]) => {
    setInit({ ...init, roomChat: data });
  };

  const activeChar = (Message: any) => {
    setInit({ ...init, activeMessage: Message });
  };

  return (
    <ChatContext.Provider value={initialValue}>{children}</ChatContext.Provider>
  );
};

export { Provider };
