import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const Store = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonText>Store</IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
};

export default Store;
