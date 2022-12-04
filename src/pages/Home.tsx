import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonToolbar,
  isPlatform,
  useIonModal,
} from '@ionic/react'
// import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "../firebase";
import { cartOutline } from 'ionicons/icons'
import Slider from 'react-slick'
import CardHero from '../components/CardHero'
import { FaTshirt } from 'react-icons/fa'
import { GiArmoredPants, GiHandBag, GiSonicShoes } from 'react-icons/gi'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Home.css'
import './Home2.css'
import CardProduct from '../components/CardProduct'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../firebase'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces'
import ModalFull from '../components/ModalFull'

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

const Home: React.FC = () => {
  const isApp = isPlatform('capacitor')
  const history = useHistory()
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
  }

  const setting = {
    dots: false,
    infinite: false,
    speed: 900,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
  }

  const [newProduct, setNewProduct] = useState<Product[]>([])

  const [present, dismiss] = useIonModal(ModalFull, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
    role: 'product',
  })

  useEffect(() => {
    const getProduct = async () => {
      const q = query(collection(db, 'product'), limit(5))
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

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === 'goToCart') {
          history.push('/cart')
        }
      },
    })
  }

  return (
    <IonPage className="container">
      <IonHeader className="head">
        <IonToolbar
          color="primary"
          style={{
            paddingLeft: '15px',
            paddingRight: '15px',
          }}
          className="center"
        >
          <IonText
            style={{
              marginTop: '9px',
            }}
            slot="start"
            className="text-toolbar"
          >
            MODA
          </IonText>
          <IonSearchbar
            style={{
              marginTop: '9px',
            }}
            onClick={() => openModal()}
          ></IonSearchbar>
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
        <div className="test"></div>
        <div
          style={{
            marginTop: '-4rem',
            backgroundColor: 'white',
            marginLeft: '17px',
            marginRight: '17px',
            paddingRight: '10px',
            paddingLeft: '10px',
            paddingTop: '15px',
            paddingBottom: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgb(0 0 0 / 0.3)',
          }}
          className="ion-padding-horizontal"
        >
          <Slider {...settings}>
            <div>
              <CardHero />
            </div>
            <div>
              <CardHero />
            </div>
            <div>
              <CardHero />
            </div>
          </Slider>
        </div>
        <div
          style={{
            display: 'flex',
            marginLeft: '17px',
            marginRight: '17px',
            marginTop: '1.5rem',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: '600',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button
              style={{
                maxWidth: '200px',
                padding: '13px',
              }}
              className="button-category"
            >
              <FaTshirt
                style={{
                  width: '50px',
                  height: '50px',
                }}
              />
            </button>
            <IonText>Shirt</IonText>
          </div>
          <div
            style={{
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: '600',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button
              style={{
                maxWidth: '200px',
                padding: '13px',
              }}
              className="button-category"
            >
              <GiArmoredPants
                style={{
                  width: '50px',
                  height: '50px',
                }}
              />
            </button>
            <IonText>Pants</IonText>
          </div>
          <div
            style={{
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: '600',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button
              style={{
                maxWidth: '200px',
                padding: '13px',
              }}
              className="button-category"
            >
              <GiSonicShoes
                style={{
                  width: '50px',
                  height: '50px',
                }}
              />
            </button>
            <IonText>Shoes</IonText>
          </div>
          <div
            style={{
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: '600',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button
              style={{
                maxWidth: '200px',
                padding: '13px',
              }}
              className="button-category"
            >
              <GiHandBag
                style={{
                  width: '50px',
                  height: '50px',
                }}
              />
            </button>
            <IonText>Bag</IonText>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            paddingRight: '17px',
            paddingLeft: '17px',
            marginTop: '15px',
            // backgroundColor: '#F1F1F1',
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
        >
          <div
            style={{
              justifyContent: 'space-between',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IonText
              style={{
                fontSize: '30px',
                fontWeight: '600',
              }}
            >
              New products
            </IonText>
            <IonButton size="small">View All</IonButton>
          </div>
          <div
            style={{
              marginTop: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '20px',
                overflow: 'scroll',
              }}
              className="example"
            >
              {newProduct.map((product) => (
                <div key={product.name}>
                  <CardProduct product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

{
  /* <IonTitle
            className="ion-no-padding"
            style={{ textAlign: "left", marginLeft: "16px", fontSize: "30px" }}
          >
            Chats
          </IonTitle>
          <IonButtons slot="primary">
            <IonButton color="dark" routerLink="/addchat">
              <IonIcon slot="icon-only" icon={personAdd}></IonIcon>
            </IonButton>
            <IonButton color="dark">
              <IonIcon slot="icon-only" icon={ellipsisVertical}></IonIcon>
            </IonButton>
          </IonButtons> */
}

// <IonList color="primary">
//   {[0, 1, 2].map((index) => (
//     <IonItem lines="none" button key={index}>
//       <IonAvatar
//         style={{ marginRight: "20px", height: "60px", width: "60px" }}
//       >
//         <img
//           alt="Silhouette of a person's head"
//           src="https://ionicframework.com/docs/img/demos/avatar.svg"
//         />
//       </IonAvatar>

//       <IonLabel style={{ paddingTop: "10px", paddingBottom: "10px" }}>
//         <h2>Rommy</h2>
//         <h3>Nk billiard dk?</h3>
//       </IonLabel>
//     </IonItem>
//   ))}
// </IonList>

export default Home
