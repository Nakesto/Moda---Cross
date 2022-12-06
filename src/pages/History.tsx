import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";

import "./History.css";
import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { UserContext } from "../context/UserData";

const History: React.FC = () => {
  const [hist, setHistory] = useState<any>({});
  const { userData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "history", userData!.uid), (doc) => {
      setHistory(doc.data() as any);
      setIsLoading(false);
    });
    return () => {
      unsub();
    };
  }, [userData]);

  const trigger = () => {
    setSuccess(true);
  };

  if (isLoading) {
    return (
      <IonPage
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IonSpinner color="black" name="lines"></IonSpinner>
      </IonPage>
    );
  }

  return (
    <IonPage className="page">
      <IonHeader className="head">
        <IonToolbar color={"primary"}>
          <IonButtons slot="start">
            <IonBackButton className="backbtn" />
          </IonButtons>
          <IonTitle style={{ textAlign: "left", marginLeft: "16px", fontSize: "30px" }}>History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <IonList
          color="primary"
          style={{
            overflow: "scroll",
          }}
        >
          {hist.products.map((data: any) => (
            <IonItem key={data.product.name} lines="none" button>
              <img className="img" style={{ height: "60px", marginRight: "10px" }} alt="produk" src={data.product.image} />

              <IonLabel style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <h2 className="des">{data.product.name}</h2>
                <h3 className="des">{"Rp" + data.product.price}</h3>
                <IonButton className="des" slot="end">
                  Beli Lagi
                </IonButton>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default History;
