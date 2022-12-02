import {
  IonAvatar,
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
import React from "react";

const Chat = () => {
  const send = () => {};
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
        </IonToolbar>
      </IonHeader>
      <IonContent className="head">
        <IonList
          style={{
            backgroundColor: "rgb(65, 199, 238, 0.4)",
            paddingBottom: "60px",
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
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
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Chat;
