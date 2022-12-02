import { IonBackButton, IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar, isPlatform } from "@ionic/react";
import produk from "../Assets/produk.png";
import minus from "../Assets/minus.png";
import plus from "../Assets/plus.png";
import "./Cart.css";

const Cart: React.FC = () => {
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
    <IonPage className="page">
      <IonHeader className="toolbar">
        <IonToolbar color={"primary"}>
          <IonButtons slot="start">
            <IonBackButton className="backbtn" />
          </IonButtons>
          <IonTitle style={{ textAlign: "left", marginLeft: "16px", fontSize: "30px" }}>Your Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <IonList className="list" color="primary">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <IonItem className="cardlist" lines="none" button key={index}>
              <img style={{ height: "40px", marginRight: "10px" }} alt="produk" src={produk} />

              <IonLabel style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <h2 className="des">Produk</h2>
                <h3 className="des">Rp. 100.000</h3>
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
          <IonRow style={{ paddingTop: "10px" }}>
            <IonCol size="4">
              <IonLabel className="totaltxt">Total</IonLabel>
            </IonCol>
            <IonCol size="4"></IonCol>
            <IonCol size="4" style={{ justifyContent: "end", display: "flex" }}>
              <IonLabel className="totalhrg">Rp. 100.000</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" style={{ display: "flex", justifyContent: "center" }}>
              <IonButton className="ctp">Continue to Payment</IonButton>
            </IonCol>
          </IonRow>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
