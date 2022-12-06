import { IonIcon, IonText, useIonToast } from '@ionic/react'
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { add, checkmarkDoneOutline } from 'ionicons/icons'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../context/UserData'
import { db } from '../firebase'
import { Product } from '../pages/Home'
import './CardProduct.css'

const CardProduct = ({ product }: { product: Product }) => {
  const [present] = useIonToast()

  const presentToast = (position: 'bottom') => {
    present({
      message: 'Add product to cart success!',
      duration: 1500,
      position: position,
      icon: checkmarkDoneOutline,
      cssClass: 'custom-toast',
    })
  }
  const { userData } = useContext(UserContext)
  const history = useHistory()
  const addCart = async (product: Product) => {
    try {
      const q = query(
        collection(db, 'cart'),
        where(
          userData!.uid + product.uid + '.product.name',
          '==',
          product.name,
        ),
      )
      const res = await getDocs(q)
      let data: any = null
      res.forEach((doc) => {
        data = doc.data()
      })

      if (data !== null) {
        data = Object.entries(data)
        await updateDoc(doc(db, 'cart', userData!.uid), {
          [userData!.uid + product.uid + '.product']: product,
          [userData!.uid + product.uid + '.quantity']: data[0][1].quantity + 1,
        })
        presentToast('bottom')
      } else {
        await updateDoc(doc(db, 'cart', userData!.uid), {
          [userData!.uid + product.uid + '.product']: product,
          [userData!.uid + product.uid + '.quantity']: 1,
        })
        presentToast('bottom')
      }
    } catch (err) {}
  }

  const goDetailProduk = (product: Product) => {
    history.push('/detailProduct', { product })
  }

  return (
    <div
      className="card-product"
      onClick={() => {
        goDetailProduk(product)
      }}
      style={{
        cursor: 'pointer',
      }}
    >
      <img src={product.image} className="card-image" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <IonText
          style={{
            marginBottom: '5px',
          }}
        >
          {product.name}
        </IonText>
        <IonText
          style={{
            marginBottom: '15px',
          }}
          onClick={() => {
            goDetailProduk(product)
          }}
        >
          {product.toko.name}
        </IonText>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <IonText>{'Rp.' + product.price}</IonText>
          <button
            onClick={(e) => {
              e.stopPropagation()
              addCart(product)
            }}
            style={{
              padding: '5px',
              zIndex: 10,
            }}
          >
            <IonIcon icon={add} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardProduct
