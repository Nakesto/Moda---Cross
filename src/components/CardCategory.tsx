import { IonText, IonIcon } from "@ionic/react";
import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { add } from "ionicons/icons";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../context/UserData";
import { db } from "../firebase";
import { Product } from "../pages/Home";
import "./CardCategory.css";

const CardCategory = ({ product }: { product: Product }) => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const addCart = async (product: Product) => {
    try {
      const q = query(
        collection(db, "cart"),
        where(userData!.uid + product.uid + ".product.name", "==", product.name)
      );
      const res = await getDocs(q);
      let data: any = null;
      res.forEach((doc) => {
        data = doc.data();
      });

      if (data !== null) {
        data = Object.entries(data);
        await updateDoc(doc(db, "cart", userData!.uid), {
          [userData!.uid + product.uid + ".product"]: product,
          [userData!.uid + product.uid + ".quantity"]: data[0][1].quantity + 1,
        });
      } else {
        await updateDoc(doc(db, "cart", userData!.uid), {
          [userData!.uid + product.uid + ".product"]: product,
          [userData!.uid + product.uid + ".quantity"]: 1,
        });
      }
    } catch (err) {}
  };

  const goDetailProduk = (product: Product) => {
    history.push("/detailProduct", { product });
  };

  return (
    <div
      onClick={() => {
        goDetailProduk(product);
      }}
      className="card-container"
    >
      <img src={product.image} className="card-image" alt={product.name} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IonText
          style={{
            marginBottom: "5px",
          }}
        >
          {product.name}
        </IonText>
        <IonText
          style={{
            marginBottom: "15px",
          }}
        >
          {product.toko.name}
        </IonText>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IonText>{"Rp." + product.price}</IonText>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addCart(product);
            }}
            style={{
              padding: "5px",
              zIndex: 10,
            }}
          >
            <IonIcon icon={add} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCategory;
