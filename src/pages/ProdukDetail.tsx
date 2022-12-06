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
import {
  cartOutline,
  chatbubbleEllipsesOutline,
  heartOutline,
} from 'ionicons/icons'
import { Link, Redirect, useLocation } from 'react-router-dom'
import './ProdukDetail.css'

const ProdukDetail = () => {
  const location = useLocation()
  const params: any = location.state

  if (params == null) {
    return <Redirect to="/home" />
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
            <img className="img-produk" src={params.product.image} />
          </div>
          <div className="container-informasi-produk">
            <div className="infromasi-produk">
              <h1 className="h1-produk">
                <b>Rp. {params.product.price}</b>
              </h1>
              <IonButton className="btn-love" fill="outline">
                <IonIcon icon={heartOutline} />
              </IonButton>
            </div>
            <h2 className="h2-produk">
              <b>{params.product.name}</b>
            </h2>
            <h4 className="h4-produk">Stock {params.product.stock}</h4>
            <h4 className="h4-produk">Kategori: {params.product.category}</h4>
            <h3 className="h3-produk">
              <b>Description</b>
              <p>{params.product.description}</p>
            </h3>
          </div>
        </div>
        <div className="container-btn-produk">
          <div className="content-btn-produk">
            <IonButton fill="outline" className="btn-chat-produk">
              <IonIcon icon={chatbubbleEllipsesOutline} />
            </IonButton>
            <IonButton className="btn-cart-produk" fill="outline">
              Add To Cart
            </IonButton>
            <IonButton className="btn-buy-produk">Buy Now</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ProdukDetail
