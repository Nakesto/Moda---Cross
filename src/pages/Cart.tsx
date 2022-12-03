import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";

import produk from "../Assets/produk.png";
import minus from "../Assets/minus.png";
import plus from "../Assets/plus.png";
import "./Cart.css";
import { useContext, useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { UserContext } from "../context/UserData";
import { Product } from "./Home";

const Cart: React.FC = () => {
  const isApp = isPlatform("capacitor");
  const [cart, setCart] = useState<Product[]>([]);
  const { userData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "cart", userData!.uid), (doc) => {
      setCart(doc.data()?.products as Product[]);
      setIsLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);

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
      <IonHeader className="toolbar">
        <IonToolbar color={"primary"}>
          <IonButtons slot="start">
            <IonBackButton className="backbtn" />
          </IonButtons>
          <IonTitle
            style={{ textAlign: "left", marginLeft: "16px", fontSize: "30px" }}
          >
            Your Cart
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <IonList className="list" color="primary">
          {cart?.map((product, index) => (
            <IonItem className="cardlist" lines="none" button key={index}>
              <img
                style={{ height: "60px", marginRight: "10px" }}
                alt="produk"
                src={produk}
              />

              <IonLabel style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <h2 className="des">{product.name}</h2>
                <h3 className="des">{"Rp" + product.price}</h3>
                <IonRow>
                  <IonButton className="btn">
                    <img src={minus} alt="" />
                  </IonButton>
                  <IonCard className="ctr">1</IonCard>
                  <IonButton className="btn">
                    <img src={plus} alt="" />
                  </IonButton>
                  <input className="cb" type="checkbox"></input>
                </IonRow>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <div className="bawah">
          <IonRow>
            <IonCol size="4">
              <IonLabel className="totaltxt">Total</IonLabel>
            </IonCol>
            <IonCol size="4"></IonCol>
            <IonCol size="4" style={{ justifyContent: "end", display: "flex" }}>
              <IonLabel className="totalhrg">Rp. 100.000</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol
              size="12"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <IonButton className="ctp">Continue to Payment</IonButton>
            </IonCol>
          </IonRow>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
