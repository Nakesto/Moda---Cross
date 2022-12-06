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
import { query, collection, limit, getDocs, where } from 'firebase/firestore'
import { cartOutline, chatbubbleEllipses } from 'ionicons/icons'
import { useState, useEffect } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import CardProduct from '../components/CardProduct'
import { db } from '../firebase'
import './StoreDetail.css'
import { BsFillStarFill } from 'react-icons/bs'

export type Product = {
  name: string
  toko: {
    name: string
    uid: string
    province: string
    photoURL: string
  }
  price: string
  description: string
  uid: string
  stock: number
  image: string
  category: string
}
const StoreDetail = () => {
  const location = useLocation()
  const [newProduct, setNewProduct] = useState<Product[]>([])
  const params: any = location.state
  useEffect(() => {
    const getProduct = async () => {
      const q = query(
        collection(db, 'product'),
        where('toko.uid', '==', params.tokos.uid),
      )
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

  if (params == null) {
    return <Redirect to="/store" />
  }
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
          <IonTitle>{params.tokos.name}</IonTitle>
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
            <img className="image-toko" src={params.tokos.image} />
          </div>
          <div className="detail-toko">
            <h1 className="h1-toko">
              <b>{params.tokos.name}</b>
            </h1>
            <h4 className="h3-toko">{params.tokos.address}</h4>
            <h4 className="h3-toko">{params.tokos.province}</h4>
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
          {newProduct.length == 0 ? (
            <div>
              <h2 style={{ textAlign: 'center' }}>Produk tidak ada...</h2>
            </div>
          ) : (
            <div className="product-card">
              {newProduct.map((product) => (
                <div key={product.name}>
                  <CardProduct product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default StoreDetail
