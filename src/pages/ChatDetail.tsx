import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import Input from '../components/Input'
import Message from '../components/Message'
import { ChatContext } from '../context/Provider'
import { db } from '../firebase'
import './ChatDetail.css'

const ChatDetail = () => {
  const [messages, setMessages] = useState([])
  const { chatId } = useContext(ChatContext)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub()
    }
  }, [chatId])

  return (
    <IonPage className="page">
      <IonHeader className="head">
        <IonToolbar color="primary">
          <IonTitle>Slebew Store</IonTitle>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <div className="container-chat">
          <div className="content-date">
            <div className="date-chat">
              <h4>
                <strong>Today</strong>
              </h4>
            </div>
          </div>
          {messages.map((m, idx) => (
            <Message message={m} key={idx} />
          ))}
          {/* <div className="content-reciever">
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
          </div> */}
        </div>
      </IonContent>
      <Input />
    </IonPage>
  )
}

export default ChatDetail
