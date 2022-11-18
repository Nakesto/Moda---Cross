import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ellipsisVertical, personAdd } from "ionicons/icons";
import "./Home.css";

const Home: React.FC = () => {
  const isApp = isPlatform("capacitor");
  // const handleUpdateChat = async () => {
  //   updateDoc(doc(db, "/userChats", "fvBEo6MuRBP0tLN7qFvG"), {
  //     messages: ["hai"],
  //   });
  // };

  // const handleCreateChat = async () => {
  //   await setDoc(doc(db, "/userChats", "fvBEo6MuRBP0tLN7qFvG"), {
  //     ["sadsa" + ".userinfo"]: {
  //       uid: "JLQ4qfvHldnOfHeDXrLo",
  //       displayName: "Rommy",
  //       photoURL: "",
  //     },
  //     ["sadsa" + ".date"]: serverTimestamp(),
  //   })
  //     .then(() => alert("Data has added to firestore"))
  //     .catch((err) => alert("Ini" + err));
  // };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle
            className="ion-no-padding"
            style={{ textAlign: "left", marginLeft: "16px", fontSize: "30px" }}
          >
            Chats
          </IonTitle>
          <IonButtons slot="primary">
            <IonButton color="dark" routerLink="/addchat">
              <IonIcon slot="icon-only" icon={personAdd}></IonIcon>
            </IonButton>
            <IonButton color="dark">
              <IonIcon slot="icon-only" icon={ellipsisVertical}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar style={{ paddingTop: "10px" }}>
          <IonSearchbar></IonSearchbar>
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

export default Home;
