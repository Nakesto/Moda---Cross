import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const Store = () => {
  return (
    <IonPage className="page">
      <IonHeader className="head">
        <IonToolbar color="primary">
          <IonText>Store</IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content" color="medium">
        <IonGrid>
          <IonRow>
            {[0, 1, 2, 3, 4].map(() => {
              return (
                <IonCol size="6">
                  <IonCard
                    className="ion-padding"
                    style={{
                      borderRadius: "20px",
                    }}
                  >
                    <img
                      src="https://awsimages.detik.net.id/community/media/visual/2019/07/08/dd5bb8bd-3562-4d34-98a1-282ca2ba9165_169.jpeg?w=700&q=90"
                      alt=""
                      width="100%"
                      style={{
                        borderRadius: "20px",
                      }}
                    />
                    <IonCardHeader
                      className="ion-no-padding"
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <IonCardTitle>Slewbew Store</IonCardTitle>
                      <IonCardSubtitle>Palembang</IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Store;
