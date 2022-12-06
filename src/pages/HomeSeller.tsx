import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonText,
  IonToolbar,
  useIonModal,
} from '@ionic/react'
// import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "../firebase";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Home.css'
import './Home2.css'
import { useHistory } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces'
import ModalFull from '../components/ModalFull'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { CiSquareRemove } from 'react-icons/ci'
import { MdDriveFileRenameOutline, MdVerified } from 'react-icons/md'
import { UserContext } from '../context/UserData'
import { Toko } from './Store'
import CardProductSeller from '../components/CardProductSeller'
import AddProduct from '../components/AddProduct'

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
  stock: number
  image: string
  category: string
}

const HomeSeller: React.FC = () => {
  const history = useHistory()
  const [dataToko, setDataToko] = useState<Toko[]>([])
  const [dataProduct, setDataProduct] = useState<Product[]>([])
  const { userData } = useContext(UserContext)
  const [present, dismiss] = useIonModal(AddProduct, {
    onDismiss: (data: { product: any }, role: string) => dismiss(data, role),
    role: 'product',
  })

  useEffect(() => {
    const getToko = async () => {
      const q = query(collection(db, 'toko'), where('uid', '==', userData?.uid))
      const querySnapshot = await getDocs(q)
      const data: Toko[] = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data() as Toko)
      })

      setDataToko(data)
    }

    const getProduct = async () => {
      const q = query(
        collection(db, 'product'),
        where('toko.uid', '==', userData?.uid),
      )
      const querySnapshot = await getDocs(q)
      const data: Product[] = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data() as Product)
      })
      setDataProduct(data)
    }
    getToko()
    getProduct()
  }, [])

  console.log(userData)

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === 'goToCart') {
          history.push('/cart')
        }

        if (ev.detail.role === 'goToProduct') {
          const product = ev.detail.data.product
          history.push('/detailProduct', { product })
        }

        if (ev.detail.role === 'confirm') {
          const productData = ev.detail.data.product
          console.log(productData)
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
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <div
          style={{
            height: '90vh',
            overflow: 'scroll',
          }}
        >
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
            {dataToko != null &&
              dataToko.map((val, idx) => (
                <Slider key={idx}>
                  <div>
                    <div
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        paddingLeft: '5px',
                        paddingRight: '5px',
                      }}
                    >
                      <img
                        src={val.image}
                        alt="no picture"
                        width="150px"
                        height="125px"
                        style={{
                          borderRadius: '15px',
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <IonText
                          style={{
                            fontWeight: '400',
                            fontSize: '20px',
                            marginBottom: '5px',
                          }}
                        >
                          Hello,
                        </IonText>
                        <IonText
                          style={{
                            fontWeight: '600',
                            fontSize: '25px',
                          }}
                        >
                          {val.name}
                        </IonText>
                      </div>
                    </div>
                  </div>
                </Slider>
              ))}
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
                marginRight: '10px',
              }}
            >
              <button
                style={{
                  maxWidth: '200px',
                  padding: '13px',
                  marginBottom: '5px',
                }}
                className="button-category"
              >
                <AiOutlineAppstoreAdd
                  style={{
                    width: '50px',
                    height: '50px',
                  }}
                />
              </button>
              <IonText>Add</IonText>
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
                  marginBottom: '5px',
                }}
                className="button-category"
              >
                <MdDriveFileRenameOutline
                  style={{
                    width: '50px',
                    height: '50px',
                  }}
                />
              </button>
              <IonText>Update</IonText>
            </div>
            <div
              style={{
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: '600',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: '10px',
                marginRight: '10px',
              }}
            >
              <button
                style={{
                  maxWidth: '200px',
                  padding: '13px',
                  marginBottom: '5px',
                }}
                className="button-category"
              >
                <MdVerified
                  style={{
                    width: '50px',
                    height: '50px',
                  }}
                />
              </button>
              <IonText>Verify</IonText>
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
                  marginBottom: '5px',
                }}
                className="button-category"
              >
                <CiSquareRemove
                  style={{
                    width: '50px',
                    height: '50px',
                  }}
                />
              </button>
              <IonText>Remove</IonText>
            </div>
          </div>
          <div
            style={{
              width: '100%',
              paddingRight: '17px',
              paddingLeft: '20px',
              marginTop: '15px',
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
                  marginTop: '20px',
                }}
              >
                Product List
              </IonText>
              <IonButton style={{ marginTop: '20px' }}>View All</IonButton>
            </div>
            {/* <div
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
                  <div key={product?.name}>
                    <CardProduct product={product} />
                  </div>
                ))}
              </div>
            </div> */}
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
                marginBottom: '60px',
                paddingLeft: '20px',
                justifyContent: 'center',
              }}
            >
              {dataProduct.map((product) => (
                <div key={product.uid}>
                  <CardProductSeller product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default HomeSeller
