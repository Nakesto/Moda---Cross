import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react'
import produk from '../Assets/produk.png'
import gopay from '../Assets/gopay.png'
import './Payment.css'
import { Redirect, useHistory, useLocation } from 'react-router'
import { useContext, useEffect, useState } from 'react'
import { deleteField, doc, Index, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { UserContext } from '../context/UserData'

const Payment: React.FC = () => {
  const location = useLocation()
  const params: any = location.state
  const history = useHistory()
  const { userData } = useContext(UserContext)
  const [success, setSuccess] = useState(false)
  const [price, setPrice] = useState(0)

  const removeCart = async () => {
    const cartRef = doc(db, 'cart', userData!.uid)
    const length = Object.entries(params.cart).length

    Object.entries(params.cart).forEach(async (data: any, index) => {
      updateDoc(cartRef, {
        [userData!.uid + data[1].product.uid]: deleteField(),
      })
        .then(() => {
          if (length - 1 === index) {
            setSuccess(true)
          }
        })
        .catch((err) => {})
    })
  }

  useEffect(() => {
    let sum = 0
    Object.entries(params.cart).map((product: any, index) => {
      let temp = parseInt(product[1].product.price)
      sum += temp
      setPrice(sum)
    })
  }, [])

  return (
    <IonPage className="page">
      <IonHeader className="toolbar">
        <IonToolbar color={'primary'}>
          <IonButtons slot="start">
            <IonBackButton className="backbtn" defaultHref="/cart" />
          </IonButtons>
          <IonTitle
            style={{ textAlign: 'left', marginLeft: '16px', fontSize: '30px' }}
          >
            Payment
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <IonList color="primary">
          {params != null &&
            Object.entries(params.cart).map((product: any, index) => (
              <IonItem className="cardlist" lines="none" button key={index}>
                <img
                  style={{ height: '60px', marginRight: '10px' }}
                  alt="produk"
                  src={product[1].product.image}
                />

                <IonLabel style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                  <h2 className="des">{product[1].product.name}</h2>
                  <h3 className="des">Rp. {product[1].product.price}</h3>
                  <IonRow>
                    <IonCard className="ctr">1</IonCard>
                  </IonRow>
                </IonLabel>
              </IonItem>
            ))}
        </IonList>
        <div>
          <h3 style={{ fontWeight: 'bold', marginLeft: '20px' }}>
            Metode Pembayaran
          </h3>
          <IonItem className="cardlist" lines="none">
            <img
              style={{ width: '60px', marginRight: '10px', marginLeft: '20px' }}
              alt="pembayaran"
              src={gopay}
            ></img>
            <IonLabel style={{ paddingBottom: '10px' }}>
              <h2 className="des">Gopay</h2>
            </IonLabel>
          </IonItem>
          <IonItem className="cardlist" lines="none">
            <img
              style={{ width: '60px', marginRight: '10px', marginLeft: '20px' }}
              alt="pembayaran"
              src={gopay}
            ></img>
            <IonLabel style={{ paddingBottom: '10px' }}>
              <h2 className="des">Gopay</h2>
            </IonLabel>
          </IonItem>
          <IonItem className="cardlist" lines="none">
            <img
              style={{ width: '60px', marginRight: '10px', marginLeft: '20px' }}
              alt="pembayaran"
              src={gopay}
            ></img>
            <IonLabel style={{ paddingBottom: '10px' }}>
              <h2 className="des">Gopay</h2>
            </IonLabel>
          </IonItem>
        </div>
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
                <IonLabel className="totalhrg">
                  Rp.
                  {price}
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" style={{ textAlign: 'center' }}>
                <IonButton className="ctp" onClick={removeCart}>
                  Pay
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
        <IonToast
          color="success"
          isOpen={success}
          onDidDismiss={() => history.push('/home')}
          message="Payment Success"
          duration={1500}
        />
      </IonContent>
    </IonPage>
  )
}

export default Payment
