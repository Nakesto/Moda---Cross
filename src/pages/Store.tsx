import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonToolbar,
  useIonModal,
} from '@ionic/react'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { cartOutline } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ModalFull from '../components/ModalFull'
import { db } from '../firebase'
import { Product } from './Home'
import StoreDefault from '../Assets/store_default.png'

export type Toko = {
  uid: string
  name: string
  description: string
  products: Product[]
  phoneNumber: string
  province: string
  image: string
}

const Store = () => {
  const [tokos, setTokos] = useState<Toko[]>([])
  const [present, dismiss] = useIonModal(ModalFull, {
    onDismiss: (data: { toko: null }, role: string) => dismiss(data, role),
    role: 'toko',
  })
  const history = useHistory()

  useEffect(() => {
    const getProduct = async () => {
      const q = query(collection(db, 'toko'), limit(15))
      const querySnapshot = await getDocs(q)
      const data: Toko[] = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data() as Toko)
      })

      setTokos(data)
    }

    getProduct()
  }, [])

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === 'goToCart') {
          history.push('/cart')
        }

        if (ev.detail.role === 'goToDetail') {
          const tokos = ev.detail.data.toko
          history.push('/detailToko', { tokos })
        }
      },
    })
  }

  const goToDetail = (tokos: Toko) => {
    history.push('/detailToko', { tokos })
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
        <IonGrid>
          <IonRow>
            {tokos.map((val, idx) => {
              return (
                <IonCol size="12" size-sm="6" key={idx}>
                  <IonCard
                    className="ion-padding"
                    style={{
                      borderRadius: '20px',
                    }}
                    onClick={() => {
                      goToDetail(val)
                    }}
                  >
                    <img
                      src={val.image === null ? StoreDefault : val.image}
                      alt=""
                      height="200px"
                      width="100%"
                      style={{
                        borderRadius: '20px',
                        objectFit: 'cover',
                      }}
                    />
                    <IonCardHeader
                      className="ion-no-padding"
                      style={{
                        marginTop: '10px',
                      }}
                    >
                      <IonCardTitle>{val.name}</IonCardTitle>
                      <IonCardSubtitle>{val.province}</IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              )
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Store
