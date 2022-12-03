import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserData";

const Profile: React.FC = () => {
  // const { isLoggedIn, userData } = useContext(UserContext);

  // useEffect(() => {
  //   console.log(userData);
  // }, [isLoggedIn, userData]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonText>Profile</IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
};

export default Profile;
