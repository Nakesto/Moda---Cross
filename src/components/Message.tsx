import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ChatContext } from "../context/Provider";
import { UserContext } from "../context/UserData";

const Message = ({ message }: any) => {
  const { userData } = useContext(UserContext);
  const { user } = useContext(ChatContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

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
