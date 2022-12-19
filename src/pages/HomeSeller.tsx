import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonToolbar,
  useIonModal,
} from '@ionic/react'
import Slider from 'react-slick'
import { useHistory } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces'
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
    photoURL: string
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
  const [datatoko, setDataToko] = useState<Toko[]>([])
  const [dataproduct, setdataproduct] = useState<Product[]>([])
  const [addproduct, setAddProduct] = useState<Product[]>([])
  const { userData } = useContext(UserContext)
  const [present, dismiss] = useIonModal(AddProduct, {
    onDismiss: (data: { product: null }, role: string) => dismiss(data, role),
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
      setdataproduct(data)
    }
    getToko()
    getProduct()
  }, [])

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === 'goToProduct') {
          const product = ev.detail.data.product
          history.push('/detailProduct', { product })
        }

        if (ev.detail.role === 'confirm') {
          const productData = ev.detail.data.product
          setAddProduct(productData)
          addData()
        }
      },
    })
  }

  const addData = async () => {
    try {
      const newDocRef = doc(collection(db, 'product'))
      await setDoc(newDocRef, {
        name: addproduct[0].name,
        toko: {
          name: datatoko[0].name,
          uid: datatoko[0].uid,
          province: datatoko[0].province,
          photoURL: datatoko[0].image,
        },
        price: addproduct[0].price,
        description: addproduct[0].description as string,
        uid: newDocRef.id,
        stock: addproduct[0].stock,
        image: addproduct[0].image as string,
        category: addproduct[0].category as string,
      })
      history.push('/homeseller')
    } catch (error) {
      console.log(error)
    }
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '10px',
              marginBottom: '10px',
              alignItems: 'flex-end',
            }}
          >
            <IonButton routerLink="/home" color="tertiary">
              Switch To User
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <div
          style={{
            height: '90vh',
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
            {datatoko != null &&
              datatoko.map((val) => (
                <Slider key={val.uid}>
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
                onClick={() => openModal()}
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
            </div>
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
                marginBottom: '60px',
                paddingLeft: '20px',
                justifyContent: 'center',
                flexDirection: 'column',
                paddingBottom: '20px',
              }}
            >
              {dataproduct.map((product) => (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  key={product.uid}
                >
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
