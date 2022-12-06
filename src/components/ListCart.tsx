import { IonButton, IonCard, IonItem, IonLabel, IonRow } from '@ionic/react'
import React, { useContext } from 'react'
import produk from '../Assets/produk.png'
import minus from '../Assets/minus.png'
import plus from '../Assets/plus.png'
import { Product } from '../pages/Home'
import { deleteField, doc, updateDoc } from 'firebase/firestore'
import { UserContext } from '../context/UserData'
import { db } from '../firebase'

const ListCart = ({
  product,
  quantity,
}: {
  product: Product
  quantity: number
}) => {
  const { userData } = useContext(UserContext)

  const plussCart = async () => {
    await updateDoc(doc(db, 'cart', userData!.uid), {
      [userData!.uid + product.uid + '.quantity']: quantity + 1,
    })
  }

  const minusCart = async () => {
    if (quantity === 1) {
      const cartRef = doc(db, 'cart', userData!.uid)

      // Remove the 'capital' field from the document
      await updateDoc(cartRef, {
        [userData!.uid + product.uid]: deleteField(),
      })

      return
    }

    await updateDoc(doc(db, 'cart', userData!.uid), {
      [userData!.uid + product.uid + '.quantity']: quantity - 1,
    })
  }

  return (
    <IonItem className="cardlist" lines="none" button>
      <img
        style={{ height: '60px', marginRight: '10px' }}
        alt="produk"
        src={product.image}
      />

      <IonLabel style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <h2 className="des">{product.name}</h2>
        <h3 className="des">{'Rp' + product.price}</h3>
        <IonRow>
          <IonButton className="btn">
            <img src={minus} alt="" onClick={minusCart} />
          </IonButton>
          <IonCard className="ctr">{quantity}</IonCard>
          <IonButton className="btn" onClick={plussCart}>
            <img src={plus} alt="" />
          </IonButton>
        </IonRow>
      </IonLabel>
    </IonItem>
  )
}

export default ListCart
