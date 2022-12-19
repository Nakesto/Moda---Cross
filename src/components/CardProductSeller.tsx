import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import {
  IonBadge,
  IonButton,
  IonIcon,
  IonText,
  useIonAlert,
  useIonModal,
  useIonToast,
} from '@ionic/react'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { checkmarkDoneOutline, create, trash } from 'ionicons/icons'
import { useContext, useState } from 'react'
import { MdVerified } from 'react-icons/md'
import { useHistory } from 'react-router'
import { UserContext } from '../context/UserData'
import { db } from '../firebase'
import { Product } from '../pages/HomeSeller'
import './CardProductSeller.css'
import UpdateProduct from './UpdateProduct'
import { rupiah } from '../pages/Cart'

const CardProductSeller = ({ product }: { product: Product }) => {
  const { userData } = useContext(UserContext)
  const history = useHistory()
  const [present, dismiss] = useIonModal(UpdateProduct, {
    onDismiss: (data: { product: Product }, role: string) =>
      dismiss(data, role),
    role: JSON.stringify(product),
  })

  const [presentAlert] = useIonAlert()
  const [presentToast] = useIonToast()

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === 'confirm') {
          updateData(ev.detail.data.product)
        }
      },
    })
  }

  const edit = (e: any, product: Product) => {
    e.stopPropagation()
    openModal()
  }

  const presentToastAlert = (message: string, position: 'bottom') => {
    presentToast({
      message: message + ' product success!',
      duration: 1500,
      position: position,
      icon: checkmarkDoneOutline,
      cssClass: 'custom-toast',
    })
  }

  const deleteProduct = async (e: any, product: Product) => {
    e.stopPropagation()
    try {
      presentAlert({
        header: 'Are you sure want to delete ?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Delete',
            role: 'confirm',
            handler: async () => {
              await deleteDoc(doc(db, 'product', product.uid))
              presentToastAlert('Delete', 'bottom')
            },
          },
        ],
      })
    } catch (err) {}
  }

  const updateData = async (data: any) => {
    const docRef = doc(db, 'product', data.uid)
    try {
      await updateDoc(docRef, data)
      presentToastAlert('Update', 'bottom')
    } catch (err) {
      console.log(err)
    }
  }

  const goDetailProduk = (product: Product) => {
    history.push('/detailProduct', { product })
  }

  const verify = async (e: any) => {
    e.stopPropagation()
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500,
    })

    if (photo) {
      const docRef = doc(db, 'product', product.uid)
      try {
        await updateDoc(docRef, { verified: 'true' })
        console.log('berhasil')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div
      className="produk-card"
      onClick={(e) => {
        goDetailProduk(product)
      }}
    >
      <img src={product.image} className="produk-image" alt={product.name} />
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
            <b>{rupiah(parseInt(product.price))}</b>
          </IonText>
          <IonBadge
            className={
              product.verified === 'true' ? 'verif-badge' : 'unverif-badge'
            }
          >
            {product.verified === 'true' ? 'verified' : 'unverified'}
          </IonBadge>
        </div>
        <div className="button-group-seller">
          <IonButton className="button-fitur" onClick={(e) => edit(e, product)}>
            <IonIcon icon={create} />
          </IonButton>
          <IonButton
            className="button-fitur"
            onClick={(e) => deleteProduct(e, product)}
          >
            <IonIcon icon={trash} />
          </IonButton>
          <IonButton onClick={(e) => verify(e)} className="button-fitur">
            <MdVerified
              style={{
                width: '20px',
                height: '20px',
              }}
            />
          </IonButton>
        </div>
      </div>
    </div>
  )
}

export default CardProductSeller
