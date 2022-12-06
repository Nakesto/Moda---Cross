import { IonIcon, IonText, useIonToast } from '@ionic/react'
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore'
import { add, checkmarkDoneOutline } from 'ionicons/icons'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../context/UserData'
import { db } from '../firebase'
import { Product } from '../pages/Home'
import './CardProduct.css'

const CardProduct = ({ product }: { product: Product }) => {
  const [present] = useIonToast()

  const presentToast = (position: 'middle') => {
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
    await updateDoc(doc(db, 'cart', userData!.uid), {
      [userData!.uid + product.uid + '.product']: product,
      [userData!.uid + product.uid + '.quantity']: 1,
    })
    presentToast('middle')
  }
  const goDetailProduk = (product: Product) => {
    history.push('/detailProduct', { product })
  }

  return (
    <div className="card-product">
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
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <IonText>{'Rp.' + product.price}</IonText>
        <button onClick={() => addCart(product)}>
          <IonIcon icon={add} />
        </button>
      </div>
    </div>
  )
}

export default CardProduct
