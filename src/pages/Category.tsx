import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSpinner,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router";
import CardCategory from "../components/CardCategory";
import { auth, db } from "../firebase";
import { Product } from "./Home";

const Category = () => {
  const location = useLocation();
  const params: any = location.state;
  const [product, setProduct] = useState<Product[]>([]);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    };
    if (params !== null) {
      getProduct();
    }
  }, []);

  const notif = () => {
    setSuccess(true);
  };

  if (params == null) {
    <Redirect to="/home" />;
  }

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
                  key={prod.uid}
                >
                  <CardCategory product={prod} notif={notif} />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
        <IonToast
          color="success"
          isOpen={success}
          onDidDismiss={() => setSuccess(false)}
          message={`Added item to your Cart`}
          duration={1500}
        />
      </IonContent>
    </IonPage>
  );
};

export default Category;
