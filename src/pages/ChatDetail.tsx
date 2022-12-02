import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React from 'react'

const ChatDetail = () => {
  return (
    <IonPage>
      <IonToolbar color="primary">
        <IonTitle style={{ textAlign: 'center' }}>Slebew Store</IonTitle>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
      </IonToolbar>
      <IonContent></IonContent>
    </IonPage>
  )
}

export default ChatDetail
