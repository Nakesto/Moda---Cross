import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonSearchbar,
  IonIcon,
  IonRow,
  IonSpinner,
} from '@ionic/react'
import React, { useState } from 'react'
import { arrowBackOutline, cartOutline } from 'ionicons/icons'
import { Product } from '../pages/Home'
import { Toko } from '../pages/Store'
import { useDebouncedCallback } from 'use-debounce'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'

const ModalFull = ({
  onDismiss,
  role,
}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void
  role: string
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [toko, setToko] = useState<Toko[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = async (word: string) => {
    if (word === '') {
      setProducts([])
      setToko([])
      setIsLoading(false)
      return
    }

    if (role === 'product') {
      const q = query(collection(db, 'product'), where('name', '>=', word))

      try {
        const querySnapshot = await getDocs(q)
        const data: Product[] = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data() as Product)
        })
        setProducts(data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    } else {
      const q = query(collection(db, 'toko'), where('name', '>=', word))

      try {
        const querySnapshot = await getDocs(q)
        const data: Toko[] = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data() as Toko)
        })
        setToko(data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      handleChange(value)
    },
    // delay in ms
    500,
    { maxWait: 1000 },
  )

  return (
    <IonPage>
      <IonHeader className="head">
        <IonToolbar
          color="primary"
          style={{
            paddingLeft: '15px',
            paddingRight: '15px',
          }}
          className="center"
        >
          <IonButtons
            slot="start"
            style={{
              marginTop: '9px',
            }}
          >
            <IonButton onClick={() => onDismiss(null)}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonSearchbar
            style={{
              marginTop: '9px',
            }}
            onIonChange={(e) => {
              setIsLoading(true)
              debounced(e.target.value)
            }}
          ></IonSearchbar>
          <IonRow slot="end">
            <IonButton onClick={() => onDismiss(null, 'goToCart')}>
              <IonIcon slot="icon-only" icon={cartOutline}></IonIcon>
            </IonButton>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {isLoading && <IonSpinner color="black" name="lines"></IonSpinner>}
        {!isLoading &&
          products?.map((product) => {
            return <div key={product.uid}>{product.name}</div>
          })}
        {!isLoading &&
          role === 'toko' &&
          toko?.map((toko) => {
            return <div key={toko.name}>{toko.name}</div>
          })}
      </IonContent>
    </IonPage>
  )
}

export default ModalFull
