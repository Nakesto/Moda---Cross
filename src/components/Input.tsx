import { IonButton, IonIcon } from '@ionic/react'
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { send } from 'ionicons/icons'
import React, { useContext, useState } from 'react'
import { ChatContext } from '../context/Provider'
import { UserContext } from '../context/UserData'
import { db } from '../firebase'
import { v4 as uuid } from 'uuid'

const Input = () => {
  const [text, setText] = useState('')

  const { userData } = useContext(UserContext)
  const { chatId, user } = useContext(ChatContext)
  const sendMessage = async () => {
    await updateDoc(doc(db, 'chats', chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: userData!.uid,
        date: Timestamp.now(),
      }),
    })

    await updateDoc(doc(db, 'userChats', userData!.uid), {
      [chatId + '.lastMessage']: {
        text,
      },
      [chatId + '.date']: serverTimestamp(),
    })

    await updateDoc(doc(db, 'userChats', user!.uid), {
      [chatId + '.lastMessage']: {
        text,
      },
      [chatId + '.date']: serverTimestamp(),
    })

    setText('')
  }

  return (
    <div className="container-input">
      <div className="text-input">
        <button className="btn-plus">+</button>
        <textarea
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <IonButton className="btn-send" onClick={sendMessage}>
        <IonIcon icon={send} />
      </IonButton>
    </div>
  )
}

export default Input
