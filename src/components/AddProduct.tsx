import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useState } from 'react'
import { camera } from 'ionicons/icons'
import { BsCameraFill } from 'react-icons/bs'
import { AiFillTags, AiOutlineStock } from 'react-icons/ai'
import profile from '../Assets/product_default.jpeg'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { storage } from '../firebase'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { base64FromPath } from '@capacitor-community/filesystem-react'
import { BiMoney } from 'react-icons/bi'
import { CgNametag } from 'react-icons/cg'
import { GiCancel } from 'react-icons/gi'
import './AddProduct.css'

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

const AddProduct = ({
  onDismiss,
  role,
}: {
  onDismiss: (data?: any, role?: string) => void
  role: string
}) => {
  const [takenPhoto, setTakenPhoto] = useState<string>()
  const [datas, setdatas] = useState<Product[]>([])
  const [selectedfile, setSelectedFile] = useState<File>()
  const [typeFile, setTypeFile] = useState<'camera' | 'file'>('camera')
  const [category, setCategory] = useState<'top' | 'pants' | 'bag' | 'shoes'>(
    'top',
  )
  //   const [description, setDescription] = useState('')
  const selectCategory = (event: CustomEvent) => {
    const selectedGender = event.detail.value
    setCategory(selectedGender)
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0])
    setTypeFile('file')
    setTakenPhoto(URL.createObjectURL(event.target!.files![0]))
  }

  const onSubmit = async (data: any) => {
    const base64 = await base64FromPath(takenPhoto!)
    const value = await fetch(base64)
    const blob: any = await value.blob()
    const valCategory = (await category) as string
    let file: File
    if (typeFile === 'camera') {
      file = new File([await blob], Math.random().toString(), {
        type: 'image/png',
      })
    } else {
      file = selectedfile!
    }
    const nameFile = typeFile === 'camera' ? file.name + '.png' : file.name

    const storageRef = ref(storage, nameFile)
    await uploadBytes(storageRef, file as Blob).then((snapshot) => {
      getDownloadURL(ref(storage, nameFile)).then((url) => {
        addData(url)
      })
    })

    const addData = async (url: string) => {
      datas.push({
        name: data.product_name as string,
        toko: {
          name: '',
          uid: '',
          province: '',
          photoURL: '',
        },
        price: data.price as string,
        description: data.description as string,
        uid: '',
        stock: data.stock as number,
        image: url,
        category: valCategory,
      })

      onDismiss({ product: datas }, 'confirm')
    }
  }

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500,
    })
    console.log(photo)

    if (!photo || /*!photo.path ||*/ !photo.webPath) {
      return
    }

    setTypeFile('camera')
    setTakenPhoto(photo.webPath)
  }

  //   const handleDescription = (e: any) => {
  //     setDescription(e.target.value)
  //     console.log(e.target.value)
  //   }

  return (
    <IonPage className="page">
      <IonHeader className="head">
        <IonToolbar color="primary">
          <IonTitle>Add Product Detail</IonTitle>
          <IonButtons slot="start">
            <GiCancel
              style={{ height: '30px', width: '30px', marginLeft: '10px' }}
              onClick={() => onDismiss(null, 'cancel')}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-img">
            <div className="profilepic">
              {takenPhoto && (
                <img
                  className="profilepic_image"
                  src={takenPhoto}
                  width="150"
                  height="150"
                  alt="Profibild"
                />
              )}
              {!takenPhoto && (
                <img
                  className="profilepic_image"
                  src={profile}
                  width="150"
                  height="150"
                  alt="Profibild"
                />
              )}
              <div className="profilepic_content">
                <label htmlFor="actual-btn1">
                  <span className="profilepic_icon">
                    <BsCameraFill className="fas" />
                  </span>
                  <span className="profilepic_text">Take photo</span>
                </label>
                <input
                  id="actual-btn1"
                  type="file"
                  onChange={fileChangeHandler}
                  hidden
                />
              </div>
            </div>
          </div>
          <div className="open-camera">
            <IonButton
              onClick={() => {
                takePhotoHandler()
              }}
            >
              <IonIcon
                slot="start"
                icon={camera}
                style={{ marginRight: '5px' }}
              />
              Take Photo
            </IonButton>
          </div>
          <div className="login-group">
            <div className="input-item-register">
              <IonLabel>
                <CgNametag className="input-icon" />
              </IonLabel>
              <IonInput
                {...register('product_name', {
                  required: 'This is a required field',
                  minLength: {
                    value: 3,
                    message: 'Name cannot be less than 3 chars!',
                  },
                })}
                placeholder="Product Name"
                className="input-text"
                name="product_name"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="product_name"
              as={<div className="error-message" style={{ color: 'red' }} />}
            />
            <div className="input-item-register">
              <IonLabel>
                <AiFillTags className="input-icon" />
              </IonLabel>
              <IonSelect
                className="gender-dropdown"
                interface="popover"
                placeholder="Select Gender"
                onIonChange={selectCategory}
                value={category}
              >
                <IonSelectOption className="item-dropdown" value="top">
                  Top
                </IonSelectOption>
                <IonSelectOption className="item-dropdown" value="pants">
                  Pants
                </IonSelectOption>
                <IonSelectOption className="item-dropdown" value="shoes">
                  Shoes
                </IonSelectOption>
                <IonSelectOption className="item-dropdown" value="bag">
                  Bag
                </IonSelectOption>
              </IonSelect>
            </div>
            <div className="input-item-register">
              <IonLabel>
                <BiMoney className="input-icon" />
              </IonLabel>
              <IonInput
                {...register('price', {
                  required: 'This is a required field',
                  pattern: {
                    value: /[0-9]/,
                    message: 'Price must be number',
                  },
                })}
                className="input-text"
                placeholder="Price"
                type="text"
                name="price"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="price"
              as={<div className="error-message" style={{ color: 'red' }} />}
            />
            <div className="input-item-register">
              <IonLabel>
                <AiOutlineStock className="input-icon" />
              </IonLabel>
              <IonInput
                {...register('stock', {
                  required: 'This is a required field',
                  pattern: {
                    value: /[0-9]/,
                    message: 'Stock cannot be zero & must be number!',
                  },
                })}
                className="input-text"
                placeholder="Stock"
                type="text"
                name="stock"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="stock"
              as={<div className="error-message" style={{ color: 'red' }} />}
            />
            <div className="text-input-area">
              <IonLabel>
                <AiOutlineStock className="input-icon" />
              </IonLabel>
              <IonInput
                {...register('description', {
                  required: 'This is a required field',
                })}
                className="input-text-area"
                placeholder="Description"
                name="description"
                id="description"
                type="text"
                // value={description}
                // onChange={handleDescription}
                style={{ paddingRight: '10px' }}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="description"
              as={<div className="error-message" style={{ color: 'red' }} />}
            />

            <IonRow>
              <button
                style={{ marginTop: '10px', marginBottom: '5px' }}
                className="btn-login"
              >
                Add Product
              </button>
            </IonRow>
          </div>
        </form>
      </IonContent>
    </IonPage>
  )
}

//   function openModal() {
//     present({
//       onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
//         if (ev.detail.role === 'confirm') {
//           setMessage(`Hello, ${ev.detail.data}!`)
//         }
//       },
//     })
//   }

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Controller Modal</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent className="ion-padding">
//         <IonButton expand="block" onClick={() => openModal()}>
//           Open
//         </IonButton>
//         <p>{message}</p>
//       </IonContent>
//     </IonPage>
//   )

export default AddProduct
