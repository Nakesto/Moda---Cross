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
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ModalFull from '../components/ModalFull'
import { db } from '../firebase'
import { Product } from './Home'

export type Toko = {
  name: string
  description: string
  products: Product[]
  phoneNumber: string
  province: string
}

const Store = () => {
  const [tokos, setTokos] = useState<Toko[]>([])
  const [present, dismiss] = useIonModal(ModalFull, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
    role: 'toko',
  })
  const history = useHistory()

  useEffect(() => {
    const getProduct = async () => {
      const q = query(collection(db, 'toko'), limit(5))
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
      },
    })
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
      <IonContent className="content" color="medium">
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
                  >
                    <img
                      src="https://awsimages.detik.net.id/community/media/visual/2019/07/08/dd5bb8bd-3562-4d34-98a1-282ca2ba9165_169.jpeg?w=700&q=90"
                      alt=""
                      height="200px"
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
