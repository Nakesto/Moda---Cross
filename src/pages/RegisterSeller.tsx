import {
  IonBackButton,
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
import './RegisterPage.css'
import { useContext, useEffect, useState } from 'react'
import { mail, calendar, camera } from 'ionicons/icons'
import { FaAddressBook, FaIdCard, FaTransgender } from 'react-icons/fa'
import { BsCameraFill, BsFillTelephoneFill } from 'react-icons/bs'
import { RiLockPasswordFill } from 'react-icons/ri'
import { HiIdentification } from 'react-icons/hi'
import { AiTwotoneSecurityScan } from 'react-icons/ai'
import profile from '../Assets/profile.png'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useHistory, useLocation } from 'react-router'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { storage, auth, db } from '../firebase'
import { UserContext } from '../context/UserData'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { base64FromPath } from '@capacitor-community/filesystem-react'
const RegisterSeller = () => {
  const [takenPhoto, setTakenPhoto] = useState<string>()
  const [selectedfile, setSelectedFile] = useState<File>()
  const { userData } = useContext(UserContext)
  const [typeFile, setTypeFile] = useState<'camera' | 'file'>('camera')
  const history = useHistory()
  const [datas, setDatas] = useState({
    photoUrls: '-',
    names: '-',
    phoneNumber: '-',
    gender: '-',
    birthdate: '-',
    userDoc: '',
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const location = useLocation()
  const { isLoggedIn } = useContext(UserContext)

  //   useEffect(() => {
  //     if (isLoggedIn === true) {
  //       history.push('/home')
  //     }
  //   }, [location.pathname, isLoggedIn, history])

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0])
    setTypeFile('file')
    setTakenPhoto(URL.createObjectURL(event.target!.files![0]))
  }

  const onSubmit = async (data: any) => {
    const base64 = await base64FromPath(takenPhoto!)
    const value = await fetch(base64)
    const blob: any = await value.blob()
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
      try {
        const docRef = await addDoc(collection(db, 'toko'), {
          name: data.storeName as string,
          phoneNumber: data.phone as string,
          address: data.address as string,
          province: data.province as string,
          ktpName: data.ktpName as string,
          ktpNumber: data.ktpNumber as string,
          image: url,
        })

        console.log(datas.userDoc)

        const dbRef = doc(db, 'user', datas.userDoc)
        await updateDoc(dbRef, {
          regSeller: true,
        })

        history.push('/profile')
      } catch (error) {
        console.log(error)
      }
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

  useEffect(() => {
    const singleUser = query(
      collection(db, 'user'),
      where('uid', '==', userData?.uid),
    )
    const unsub = onSnapshot(singleUser, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setDatas({
          photoUrls: doc.data().photoUrl,
          names: doc.data().name,
          phoneNumber: doc.data().phone,
          gender: doc.data().gender,
          birthdate: doc.data().birthdate,
          userDoc: doc.id,
        })
      })
    })
    return () => {
      unsub()
    }
  }, [userData?.uid])

  return (
    <IonPage className="page">
      <IonHeader className="head">
        <IonToolbar color="primary">
          <IonTitle>Fill Your Store Profile</IonTitle>
          <IonButtons slot="start">
            <IonBackButton />
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
                  <span className="profilepic_text">Edit Profile</span>
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
                <HiIdentification className="input-icon" />
              </IonLabel>
              <IonInput
                {...register('storeName', {
                  required: 'This is a required field',
                  minLength: {
                    value: 3,
                    message: 'Store name cannot be less than 3 chars!',
                  },
                })}
                placeholder="Store Name"
                className="input-text"
                name="storeName"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="storeName"
              as={<div className="error-message" style={{ color: 'red' }} />}
            />
            <div className="input-item-register">
              <IonLabel>
                <FaAddressBook className="input-icon" />
              </IonLabel>
              <IonInput
                {...register('address', {
                  required: 'This is a required field',
                  minLength: {
                    value: 3,
                    message: 'Address name cannot be less than 3 chars!',
                  },
                })}
                placeholder="Address"
                className="input-text"
                name="address"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="address"
              as={<div className="error-message" style={{ color: 'red' }} />}
            />
            <div className="input-item-register">
              <IonLabel>
                <FaAddressBook className="input-icon" />
              </IonLabel>
              <IonInput
                {...register('province', {
                  required: 'This is a required field',
                  minLength: {
                    value: 3,
                    message: 'Province name cannot be less than 3 chars!',
                  },
                })}
                placeholder="province"
                className="input-text"
                name="province"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="province"
              as={<div className="error-message" style={{ color: 'red' }} />}
            />
            <div className="input-item-register">
              <IonLabel>
                <BsFillTelephoneFill className="input-icon" />
              </IonLabel>
              <IonInput
                {...register('phone', {
                  required: 'This is a required field',
                  minLength: {
                    value: 11,
                    message: 'Phone number cannot less than 11 number!',
                  },
                  maxLength: {
                    value: 13,
                    message: 'Phone number cannot more than 13 number!',
                  },
                })}
                className="input-text"
                placeholder="Phone Number"
                type="number"
                name="phone"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="phone"
              as={<div className="error-message" style={{ color: 'red' }} />}
            />
            <div className="input-item-register">
              <IonLabel>
                <HiIdentification className="input-icon" />
              </IonLabel>
              <IonInput
                {...register('ktpName', {
                  required: 'This is a required field',
                  minLength: {
                    value: 3,
                    message: 'KTP name cannot be less than 3 chars!',
                  },
                })}
                placeholder="KTP Name"
                className="input-text"
                name="ktpName"
                type="text"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="ktpName"
              as={<div className="error-message" style={{ color: 'red' }} />}
            />
            <div className="input-item-register">
              <IonLabel>
                <FaIdCard className="input-icon" />
              </IonLabel>
              <IonInput
                {...register('ktpNumber', {
                  required: 'This is a required field',
                  minLength: {
                    value: 11,
                    message: 'KTP number cannot less than 11 number!',
                  },
                  maxLength: {
                    value: 13,
                    message: 'KTP number cannot more than 13 number!',
                  },
                })}
                className="input-text"
                placeholder="KTP Number"
                type="number"
                name="ktpNumber"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="ktpNumber"
              as={<div className="error-message" style={{ color: 'red' }} />}
            />
            <IonRow>
              <button
                style={{ marginTop: '10px', marginBottom: '5px' }}
                className="btn-login"
              >
                Register Seller
              </button>
            </IonRow>
          </div>
        </form>
      </IonContent>
    </IonPage>
  )
}

export default RegisterSeller
