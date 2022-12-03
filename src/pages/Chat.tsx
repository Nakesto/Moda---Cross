import {
  IonAvatar,
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { ChatContext, Provider } from "../context/Provider";
import { UserContext } from "../context/UserData";
import { db } from "../firebase";
import { User } from "./AddChat";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const history = useHistory();
  const { userData } = useContext(UserContext);
  const { activeRoomChat } = useContext(ChatContext);

  const goAdd = () => {
    history.push("/addchat");
  };

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", userData!.uid), (doc) => {
        setChats(doc.data() as any);
      });

      return () => {
        unsub();
      };
    };

    userData?.uid && getChats();
  }, [userData]);

  const handleSelect = (u: User) => {
    activeRoomChat(u);
    history.push("/detail");
  };

  return (
    <IonPage className="container">
      <IonHeader className="head">
        <IonToolbar
          color="primary"
          style={{
            textAlign: "center",
          }}
        >
          <IonText>Chat</IonText>
          <IonButton slot="primary" onClick={goAdd}>
            +
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <IonList
          style={{
            backgroundColor: "rgb(65, 199, 238, 0.4)",
            paddingBottom: "35px",
            height: "90vh",
            overflow: "scroll",
          }}
        >
          {Object.entries(chats)
            ?.sort((a: any, b: any) => b[1].date - a[1].date)
            .map((chat: any) => (
              <IonItem
                lines="none"
                button
                key={chat[0]}
                className="ion-margin"
                style={{
                  borderRadius: "12px",
                }}
                onClick={() => handleSelect(chat[1].userInfo)}
              >
                <IonAvatar
                  style={{ marginRight: "20px", height: "60px", width: "60px" }}
                >
                  <img
                    alt="Silhouette of a person's head"
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  />
                </IonAvatar>

                <IonLabel style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                  <h2
                    style={{
                      paddingBottom: "15px",
                    }}
                  >
                    {chat[1]?.userInfo.displayName}
                  </h2>
                  <h3>{chat[1].lastMessage?.text}</h3>
                </IonLabel>
              </IonItem>
            ))}
          {/* {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <IonItem
              lines="none"
              button
              key={index}
              className="ion-margin"
              style={{
                borderRadius: "12px",
              }}
            >
              <IonAvatar
                style={{ marginRight: "20px", height: "60px", width: "60px" }}
              >
                <img
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </IonAvatar>

              <IonLabel style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <h2
                  style={{
                    paddingBottom: "15px",
                  }}
                >
                  Rommy
                </h2>
                <h3>Nk billiard dk?</h3>
              </IonLabel>
            </IonItem>
          ))} */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Chat;
