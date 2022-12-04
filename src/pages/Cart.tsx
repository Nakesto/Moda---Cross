import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import './Cart.css'
import { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { UserContext } from '../context/UserData'
import { Product } from './Home'
import { useHistory } from 'react-router-dom'
import ListCart from '../components/ListCart'

const Cart: React.FC = () => {
  const [cart, setCart] = useState({})
  const { userData } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'cart', userData!.uid), (doc) => {
      setCart(doc.data() as any)
      setIsLoading(false)
    })
    return () => {
      unsub()
    }
  }, [userData])

  const toPayment = () => {
    history.push('/payment', { cart })
  }

  if (isLoading) {
    return (
      <IonPage
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IonSpinner color="black" name="lines"></IonSpinner>
      </IonPage>
    )
  }

  return (
    <IonPage className="page">
      <IonHeader className="head">
        <IonToolbar color={'primary'}>
          <IonButtons slot="start">
            <IonBackButton className="backbtn" />
          </IonButtons>
          <IonTitle
            style={{ textAlign: 'left', marginLeft: '16px', fontSize: '30px' }}
          >
            Your Cart
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <IonList
          color="primary"
          style={{
            overflow: 'scroll',
          }}
        >
          {Object.entries(cart).map((data: any, index) => (
            <ListCart
              product={data[1].product as Product}
              quantity={data[1].quantity as number}
              key={index}
            />
          ))}
        </IonList>
        {/* <IonGrid color="secondary" className="bawah">
            <IonRow style={{ width: "100%" }}>
              <IonCol size="4">
                <IonLabel className="totaltxt">Total</IonLabel>
              </IonCol>
              <IonCol size="4"></IonCol>
              <IonCol
                size="4"
                style={{ justifyContent: "end", display: "flex" }}
              >
                <IonLabel className="totalhrg">Rp. 100.000</IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol
                size="12"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Link to="/payment">
                  <IonButton className="ctp">Continue to Payment</IonButton>
                </Link>
              </IonCol>
            </IonRow>
          </IonGrid> */}
        {Object.entries(cart).length !== 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              position: 'fixed',
              bottom: 1,
              left: 0,
            }}
          >
            <IonGrid
              style={{
                maxWidth: '1024px',
                height: '115px',
                backgroundColor: 'white',
              }}
            >
              <IonRow>
                <IonCol size="4">
                  <IonLabel className="totaltxt">Total</IonLabel>
                </IonCol>
                <IonCol size="4"></IonCol>
                <IonCol
                  size="4"
                  style={{ justifyContent: 'end', display: 'flex' }}
                >
                  <IonLabel className="totalhrg">Rp. 100.000</IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" style={{ textAlign: 'center' }}>
                  <IonButton onClick={toPayment} className="ctp">
                    Continue to Payment
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Cart
