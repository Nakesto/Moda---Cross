import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonSearchbar,
  IonToolbar,
} from "@ionic/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router";
import CardCategory from "../components/CardCategory";
import CardProduct from "../components/CardProduct";
import { auth, db } from "../firebase";
import { Product } from "./Home";

const Category = () => {
  const location = useLocation();
  const params: any = location.state;
  const [product, setProduct] = useState<Product[]>([]);
  const { currentUser } = auth;

  useEffect(() => {
    const getProduct = async () => {
      const q = query(
        collection(db, "product"),
        where("category", "==", params.category)
      );
      const querySnapshot = await getDocs(q);
      const data: Product[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data() as Product);
      });
      setProduct(data);
    };
    if (params != null) {
      getProduct();
    }
  }, []);

  if (params === null) {
    <Redirect to="/home" />;
  }

  return (
    <IonPage className="page">
      <IonHeader className="head">
        <IonHeader>
          <IonToolbar
            color="primary"
            style={{
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
            className="center"
          >
            <IonButtons
              slot="start"
              style={{
                marginTop: "9px",
              }}
            >
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonSearchbar
              style={{
                marginTop: "9px",
              }}
            ></IonSearchbar>
          </IonToolbar>
        </IonHeader>
      </IonHeader>
      <IonContent className="content">
        <IonGrid
          className="ion-padding"
          style={{
            gridGrap: "50px",
          }}
        >
          <IonRow>
            {product.map((prod) => {
              return (
                <IonCol
                  size="12"
                  sizeXs="6"
                  sizeSm="4"
                  sizeMd="3"
                  key={prod.name}
                >
                  <CardCategory product={prod} />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Category;
