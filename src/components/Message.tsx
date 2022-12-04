import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserData";

const Message = ({ message }: any) => {
  const { userData } = useContext(UserContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, userData]);

  return (
    <div
      ref={ref}
      className={`${
        message!.senderId === userData!.uid
          ? "content-sender"
          : "content-reciever"
      }`}
    >
      <div
        className={`${
          message!.senderId === userData!.uid ? "chat-sender" : "chat-reciever"
        }`}
      >
        <p>{message.text}</p>
      </div>
      <p>10.30 AM</p>
    </div>
  );
};

export default Message;
