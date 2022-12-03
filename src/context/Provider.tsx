import React, { createContext, useContext, useState } from "react";
import { User } from "../pages/AddChat";
import { UserContext } from "./UserData";

export type Chat = {
  chatId: string;
  user: User | null;
  activeRoomChat: (data: User) => void;
};

const initialValue: Chat = {
  chatId: "",
  user: null,
  activeRoomChat: (data: User) => {},
};

const ChatContext = createContext(initialValue);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [init, setInit] = useState(initialValue);
  const { userData } = useContext(UserContext);

  const activeRoomChat = (data: User) => {
    setInit({
      ...init,
      user: data,
      chatId:
        userData!.uid > data.uid
          ? userData?.uid + data.uid
          : data.uid + userData?.uid,
    });
  };

  return (
    <ChatContext.Provider value={{ ...init, activeRoomChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export { Provider, ChatContext };
