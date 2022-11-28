import { IonButton, IonText } from "@ionic/react";
import React from "react";
import Tom from "../Assets/tom_holland.jpg";

const CardHero = () => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        paddingLeft: "5px",
        paddingRight: "5px",
      }}
    >
      <img
        src={Tom}
        alt="Baju"
        width="150px"
        height="125px"
        style={{
          borderRadius: "15px",
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
            fontWeight: "400",
            fontSize: "20px",
            marginBottom: "5px",
          }}
        >
          Introduction
        </IonText>
        <IonText
          style={{
            fontWeight: "600",
            fontSize: "25px",
          }}
        >
          H&M Shirt
        </IonText>
        <IonButton size="small">Buy Now</IonButton>
      </div>
    </div>
  );
};

export default CardHero;
