import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { query, collection, getDocs, where } from "firebase/firestore";
import { cartOutline, chatbubbleEllipses } from "ionicons/icons";
import { useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import { db } from "../firebase";
import "./StoreDetail.css";

export type Product = {
  name: string;
  toko: {
    name: string;
    uid: string;
    province: string;
    photoURL: string;
  };
  price: string;
  description: string;
  uid: string;
  stock: number;
  image: string;
};
const StoreDetail = () => {
  const location = useLocation();
  const [newProduct, setNewProduct] = useState<Product[]>([]);
  const params: any = location.state;
  useEffect(() => {
    const getProduct = async () => {
      const q = query(
        collection(db, "product"),
        where("toko.name", "==", params.tokos.name)
      );
      const querySnapshot = await getDocs(q);
      const data: Product[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data() as Product);
      });
      setNewProduct(data);
    };
    if (params != null) {
      getProduct();
    }
  }, [params]);

  if (params == null) {
    return <Redirect to="/home" />;
  }
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
          <IonTitle>{params.tokos.name}</IonTitle>
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
        <div className="profile-toko">
          <div className="image-container-toko">
            <img
              className="image-toko"
              src={params.tokos.image}
              alt={params.tokos.name}
            />
          </div>
          <div className="detail-toko">
            <h1 className="h1-toko">
              <b>{params.tokos.name}</b>
            </h1>
            <h4 className="h3-toko">{params.tokos.province}</h4>
            <IonButton className="btn-chat-toko">
              <IonIcon slot="end" icon={chatbubbleEllipses}></IonIcon>Chat
              Penjual
            </IonButton>
          </div>
          <div></div>
        </div>

        <div className="line-toko">
          <div style={{ flex: 1, height: "1px", backgroundColor: "black" }} />
          <div>
            <h2
              className="h2-toko"
              style={{ width: "150px", textAlign: "center" }}
            >
              <b>Product</b>
            </h2>
          </div>
          <div style={{ flex: 1, height: "1px", backgroundColor: "black" }} />
        </div>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          {newProduct.length === 0 ? (
            <div>
              <h2 style={{ textAlign: "center" }}>Produk tidak ada...</h2>
            </div>
          ) : (
            <div className="product-card">
              {newProduct.map((product: Product) => (
                <div key={product.name}>
                  <CardProduct product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StoreDetail;
