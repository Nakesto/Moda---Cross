import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase";
import { useDebouncedCallback } from "use-debounce";

export type User = {
  name: string;
  umur: number;
  photoUrl: string;
  uid: string;
};

const AddChat = () => {
  const [people, setPeople] = useState<User[]>([]);

  const handleChange = async (name: string) => {
    if (name === "") {
      setPeople([]);
      return;
    }
    const q = query(collection(db, "user"), where("name", "==", name));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setPeople([doc.data() as User]);
      });
      console.log("panggil");
    } catch (err) {
      console.log(err);
    }
  };

  const addUserChats = async (user: User) => {
    const { currentUser } = auth;

    if (currentUser) {
      const combinedId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.name,
          photoURL: user.photoUrl,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
  };

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      handleChange(value);
    },
    // delay in ms
    500,
    { maxWait: 500 }
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton />
          </IonButtons>
          <IonTitle>Choose People</IonTitle>
          <IonButtons slot="primary">
            <IonButton>Create</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            onIonChange={(e) => debounced(e.target.value)}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {people.length === 0 ? (
          <IonTitle>Cari orang dong...</IonTitle>
        ) : (
          <IonList className="ion-padding-top">
            {people.map((people, index) => (
              <IonItem
                lines="none"
                button
                key={index}
                onClick={() => addUserChats(people)}
              >
                <IonAvatar
                  style={{ marginRight: "20px", height: "60px", width: "60px" }}
                >
                  <img
                    alt="Silhouette of a person's head"
                    src={people.photoUrl}
                    key={people.photoUrl}
                  />
                </IonAvatar>

                <IonLabel style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                  <h2>{people.name}</h2>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AddChat;
