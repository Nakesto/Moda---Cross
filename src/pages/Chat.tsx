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
  const send = () => {
    
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonText>Chat</IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList color="primary">
          {[0, 1, 2].map((index) => (
            <IonItem lines="none" button key={index}>
              <IonAvatar
                style={{ marginRight: "20px", height: "60px", width: "60px" }}
              >
                <img
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </IonAvatar>

              <IonLabel style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <h2>Rommy</h2>
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
