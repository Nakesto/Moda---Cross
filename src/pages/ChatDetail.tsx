import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { send } from 'ionicons/icons'
import React from 'react'
import { BsPlus } from 'react-icons/bs'
import './ChatDetail.css'

const ChatDetail = () => {
  return (
    <IonPage>
      <IonToolbar color="primary">
        <IonTitle>Slebew Store</IonTitle>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
      </IonToolbar>
      <IonContent className="content-detail">
        <div className="container-chat">
          <div className="content-date">
            <div className="date-chat">
              <h4>
                <strong>Today</strong>
              </h4>
            </div>
          </div>
          <div className="content-reciever">
            <div className="chat-reciever">
              <p>Halo apa kabar?</p>
            </div>
            <p>10.30 AM</p>
          </div>
          <div className="content-sender">
            <div className="chat-sender">
              <p>Iya kakk</p>
            </div>
            <p>10.35 AM</p>
          </div>
          <div className="content-reciever">
            <div className="chat-reciever">
              <p>Kami sedang ada promo terbaru...</p>
            </div>
            <p>10.37 AM</p>
          </div>
          <div className="content-sender">
            <div className="chat-sender">
              <p>Wah asik tuh, nanti saya langsung cek aja</p>
            </div>
            <p>10.40 AM</p>
          </div>
          <div className="content-sender">
            <div className="chat-sender">
              <p>Wah asik tuh, nanti saya langsung cek aja</p>
            </div>
            <p>10.40 AM</p>
          </div>
          <div className="content-sender">
            <div className="chat-sender">
              <p>Wah asik tuh, nanti saya langsung cek aja</p>
            </div>
            <p>10.40 AM</p>
          </div>
        </div>
      </IonContent>
      <div className="container-input">
        <div className="text-input">
          <button className="btn-plus">+</button>
          <textarea className="input" />
        </div>
        <IonButton className="btn-send">
          <IonIcon icon={send} />
        </IonButton>
      </div>
    </IonPage>
  )
}

export default ChatDetail
