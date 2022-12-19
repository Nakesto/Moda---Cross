import { IonButton, IonCard, IonItem, IonLabel, IonRow } from '@ionic/react'
import { useContext } from 'react'
import minus from '../Assets/minus.png'
import plus from '../Assets/plus.png'
import { Product } from '../pages/Home'
import { deleteField, doc, updateDoc } from 'firebase/firestore'
import { UserContext } from '../context/UserData'
import { db } from '../firebase'
import { rupiah } from '../pages/Cart'

const ListCart = ({
  product,
  quantity,
  trigger,
}: {
  product: Product
  quantity: number
  trigger: () => void
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

      trigger()
      return
    }

    await updateDoc(doc(db, 'cart', userData!.uid), {
      [userData!.uid + product.uid + '.quantity']: quantity - 1,
    })
  }

  return (
    <IonItem className="cardlist" lines="none" button>
      <img
        style={{
          height: '100px',
          width: '120px',
          borderRadius: '10px',
          marginRight: '10px',
        }}
        alt="produk"
        src={product.image}
      />

      <IonLabel style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <h2 className="des">{product.name}</h2>
        <h3 className="des">{rupiah(parseInt(product.price))}</h3>
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
