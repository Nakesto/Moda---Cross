import { IonIcon, IonText } from "@ionic/react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { add } from "ionicons/icons";
import React, { useContext } from "react";
import { UserContext } from "../context/UserData";
import { db } from "../firebase";
import { Product } from "../pages/Home";

const CardProduct = ({ product }: { product: Product }) => {
  const { userData } = useContext(UserContext);

  const addCart = async (product: Product) => {
    await updateDoc(doc(db, "cart", userData!.uid), {
      products: arrayUnion(product),
    });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "10px",
        width: "150px",
        borderRadius: "15px",
      }}
    >
      <img
        src="https://static.pullandbear.net/2/static2/itxwebstandard/images/home/2021-05/28/MOVIES.jpg?v=20221127020707"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "150px",
        }}
      />
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
          <button onClick={() => addCart(product)}>
            <IonIcon icon={add} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
