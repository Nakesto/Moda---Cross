import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { query, collection, limit, getDocs } from 'firebase/firestore'
import { cartOutline, chatbubbleEllipses } from 'ionicons/icons'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CardProduct from '../components/CardProduct'
import { db } from '../firebase'
import './StoreDetail.css'

export type Product = {
  name: string
  toko: {
    name: string
    uid: string
    province: string
  }
  price: string
  description: string
  uid: string
}
const StoreDetail = () => {
  const [newProduct, setNewProduct] = useState<Product[]>([])
  useEffect(() => {
    const getProduct = async () => {
      const q = query(collection(db, 'product'))
      const querySnapshot = await getDocs(q)
      const data: Product[] = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data() as Product)
      })

      setNewProduct(data)
    }

    getProduct()
  }, [])
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
          <IonTitle>Budi Store</IonTitle>
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
        <div className="profile-toko">
          <div className="image-container-toko">
            <img
              className="image-toko"
              src="https://awsimages.detik.net.id/community/media/visual/2019/07/08/dd5bb8bd-3562-4d34-98a1-282ca2ba9165_169.jpeg?w=700&q=90"
            />
          </div>
          <div className="detail-toko">
            <h1 className="h1-toko">
              <b>Nama Toko</b>
            </h1>
            <h4 className="h3-toko">Lokasi Toko</h4>
            <IonButton className="btn-chat-toko">
              <IonIcon slot="end" icon={chatbubbleEllipses}></IonIcon>Chat
              Penjual
            </IonButton>
          </div>
        </div>
        <div className="line-toko">
          <div style={{ flex: 1, height: '1px', backgroundColor: 'black' }} />
          <div>
            <h2
              className="h2-toko"
              style={{ width: '150px', textAlign: 'center' }}
            >
              <b>Product</b>
            </h2>
          </div>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'black' }} />
        </div>
        <div
          style={{
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          <div className="product-card">
            {newProduct.map((product) => (
              <div key={product.name}>
                <CardProduct product={product} />
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default StoreDetail
