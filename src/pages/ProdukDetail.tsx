import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonRow,
  IonButton,
  IonIcon,
  IonContent,
  IonToast,
} from "@ionic/react";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  cartOutline,
  chatbubbleEllipsesOutline,
  heartOutline,
} from "ionicons/icons";
import { useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { auth, db } from "../firebase";
import { Product } from "./Home";
import "./ProdukDetail.css";

const ProdukDetail = () => {
  const location = useLocation();
  const params: any = location.state;
  const { currentUser } = auth;
  const [isSuccess, setIsSuccess] = useState(false);

  const addCart = (product: Product) => {
    updateDoc(doc(db, "cart", currentUser!.uid), {
      [currentUser!.uid + product.uid + ".product"]: product,
      [currentUser!.uid + product.uid + ".quantity"]: 1,
    }).then(() => {
      setIsSuccess(true);
    });
  };

  const addUserChats = async () => {
    if (currentUser) {
      const combinedId =
        currentUser.uid > params.product.toko.uid
          ? currentUser.uid + params.product.toko.uid
          : params.product.toko.uid + currentUser.uid;

      try {
        const res = await getDoc(doc(db, "chats", combinedId));

        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          //create user chats
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: params.product.toko.uid,
              displayName: params.product.toko.name,
              photoURL: params.product.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", params.product.toko.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      } catch (err) {}
    }
  };

  if (params == null) {
    return <Redirect to="/home" />;
  }

  console.log(params.product.toko.uid);

  return (
    <IonPage className="page">
      <IonHeader className="head">
        <IonToolbar
          color="primary"
          style={{
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
          className="center"
        >
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Detail Produk</IonTitle>
          <IonRow slot="end">
            <Link to="/cart">
              <IonButton>
                <IonIcon slot="icon-only" icon={cartOutline}></IonIcon>
              </IonButton>
            </Link>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <div className="container-produk">
          <div className="container-img-produk">
            <img
              className="img-produk"
              src={params.product.image}
              alt={params.product.name}
            />
          </div>
          <div className="container-informasi-produk">
            <div className="infromasi-produk">
              <h1 className="h1-produk">
                <b>Rp. {params.product.price}</b>
              </h1>
              <IonButton className="btn-love" fill="outline">
                <IonIcon icon={heartOutline} />
              </IonButton>
            </div>
            <h2 className="h2-produk">{params.product.name}</h2>
            <h4 className="h4-produk">Stock {params.product.stock}</h4>
            <h3 className="h3-produk">
              <b>Description</b>
              <p>{params.product.description}</p>
            </h3>
          </div>
        </div>
        <div className="container-btn-produk">
          <div className="content-btn-produk">
            {currentUser!.uid !== params.product.toko.uid && (
              <IonButton
                onClick={addUserChats}
                fill="outline"
                className="btn-chat-produk"
              >
                <IonIcon icon={chatbubbleEllipsesOutline} />
              </IonButton>
            )}

            <IonButton
              className="btn-cart-produk"
              fill="outline"
              onClick={() => addCart(params.product as Product)}
            >
              Add To Cart
            </IonButton>
            <IonButton className="btn-buy-produk">Buy Now</IonButton>
          </div>
        </div>
        <IonToast
          color="success"
          isOpen={isSuccess}
          onDidDismiss={() => setIsSuccess(false)}
          message={`Add ${params.product.name} to Cart Successfull`}
          duration={1500}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProdukDetail;
