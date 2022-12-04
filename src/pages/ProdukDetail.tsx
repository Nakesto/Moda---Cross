import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonRow,
  IonButton,
  IonIcon,
  IonContent,
} from '@ionic/react'
import { cartOutline, heartOutline } from 'ionicons/icons'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Product } from './Home'
import './ProdukDetail.css'

const ProdukDetail = () => {
  const location = useLocation()
  const [newProduct, setNewProduct] = useState<Product[]>([])
  const params: any = location.state
  return (
    <IonPage className="page">
      <IonHeader className="head">
        <IonToolbar
          color="primary"
          style={{
            paddingLeft: '15px',
            paddingRight: '15px',
          }}
          className="center"
        >
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Detail Produk</IonTitle>
          <IonRow slot="end">
            <Link to="/cart">
              <IonButton>
                <IonIcon slot="icon-only" icon={cartOutline}></IonIcon>
              </IonButton>
            </Link>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <div className="container-produk">
          <div className="container-img-produk">
            <img
              className="img-produk"
              src="https://firebasestorage.googleapis.com/v0/b/moda-65a6b.appspot.com/o/tokogigi.jpg?alt=media&token=9aa79a48-ef09-4134-a807-4f5f798f8a17"
            />
          </div>
          <div className="container-informasi-produk">
            <div className="infromasi-produk">
              <h1>Rp. 100.000</h1>
              <IonButton
                style={{ width: '60px', height: '60px' }}
                fill="outline"
              >
                {' '}
                <IonIcon icon={heartOutline} />
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ProdukDetail
