import {
  IonBadge,
  IonButton,
  IonIcon,
  IonText,
  useIonToast,
} from '@ionic/react'
import { doc, updateDoc } from 'firebase/firestore'
import { checkmarkDoneOutline, create, trash } from 'ionicons/icons'
import { useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../context/UserData'
import { db } from '../firebase'
import { Product } from '../pages/Home'
import './CardProductSeller.css'

const CardProductSeller = ({ product }: { product: Product }) => {
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
    <div
      className="produk-card"
      onClick={() => {
        goDetailProduk(product)
      }}
    >
      <img src={product.image} className="produk-image" />
      <div className="list-container">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <IonText className="produk-name">
            <b>{product.name}</b>
          </IonText>
          <IonText className="produk-stock">Stock: {product.stock}</IonText>
          <IonText className="produk-price">
            <b>Rp. {product.price}</b>
          </IonText>
          <IonBadge className="verif-badge">Unverified</IonBadge>
        </div>
        <div className="button-group-seller">
          <IonButton style={{ marginRight: '10px' }}>
            <IonIcon icon={create} />
          </IonButton>
          <IonButton>
            <IonIcon icon={trash} />
          </IonButton>
        </div>
      </div>
    </div>
  )
}

export default CardProductSeller
