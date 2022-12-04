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
import { useState } from 'react'
import { arrowBackOutline, cartOutline } from 'ionicons/icons'
import { Product } from '../pages/Home'
import { Toko } from '../pages/Store'
import { useDebouncedCallback } from 'use-debounce'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import './ModalFull.css'
import { useHistory } from 'react-router'

const ModalFull = ({
  onDismiss,
  role,
}: {
  onDismiss: (data?: any, role?: string) => void
  role: string
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [toko, setToko] = useState<Toko[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

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

  const getDataSearch = (val: any) => {
    onDismiss({ toko: val }, 'goToDetail')
  }

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
            return (
              <div key={product.uid} className="search-toko">
                <div className="img-toko-search">
                  <img
                    className="img-toko"
                    src="https://awsimages.detik.net.id/community/media/visual/2019/07/08/dd5bb8bd-3562-4d34-98a1-282ca2ba9165_169.jpeg?w=700&q=90"
                  />
                </div>
                <div className="toko-detail">
                  <h3 className="h1-search">
                    <b>{product.name}</b>
                  </h3>
                  <h5 className="h3-search">Rp. {product.price}</h5>
                  <p>
                    {product.toko.name} - {product.toko.province}
                  </p>
                </div>
              </div>
            )
          })}
        {!isLoading &&
          role === 'toko' &&
          toko?.map((val, idx) => {
            return (
              <div key={idx} className="search-toko">
                <div className="img-toko-search">
                  <img className="img-toko" src={val.image} />
                </div>
                <div className="toko-detail">
                  <h3 className="h1-search">
                    <b>{val.name}</b>
                  </h3>
                  <h5 className="h3-search">{val.province}</h5>
                  <IonButton
                    onClick={() => {
                      getDataSearch(val)
                    }}
                  >
                    Go to store
                  </IonButton>
                </div>
              </div>
            )
          })}
      </IonContent>
    </IonPage>
  )
}

export default ModalFull
