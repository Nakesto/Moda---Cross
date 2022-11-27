import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonGrid,
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
import { useRef, useState } from 'react'
import { mail, calendar } from 'ionicons/icons'
import { FaTransgender } from 'react-icons/fa'
import { BsCameraFill, BsFillTelephoneFill } from 'react-icons/bs'
import { RiLockPasswordFill } from 'react-icons/ri'
import { HiIdentification } from 'react-icons/hi'
import { AiTwotoneSecurityScan } from 'react-icons/ai'
import profile from '../Assets/profile.png'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { useHistory } from 'react-router'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

const RegisterPage: React.FC = () => {
  const inputEmail = useRef<HTMLIonInputElement>(null)
  const inputNama = useRef<HTMLIonInputElement>(null)
  const inputPhone = useRef<HTMLIonInputElement>(null)
  const inputPassword = useRef<HTMLIonInputElement>(null)
  const inputDate = useRef<HTMLIonInputElement>(null)
  const inputPin = useRef<HTMLIonInputElement>(null)
  const [takenPhoto, setTakenPhoto] = useState<string>()
  const [selectedfile, setSelectedFile] = useState<File>()
  const [fileName, setFileName] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const storage = getStorage()
  const db = getFirestore()
  const history = useHistory()
  const selectGender = (event: CustomEvent) => {
    const selectedGender = event.detail.value
    setGender(selectedGender)
  }

  const email = inputEmail.current?.value as string
  const password = inputPassword.current?.value as string

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0])
    setFileName(event.target!.files![0].name)
    setTakenPhoto(URL.createObjectURL(event.target!.files![0]))
  }

  const addData = async (url: string) => {
    const valGender = gender as string
    try {
      const docRef = await addDoc(collection(db, 'user'), {
        name: inputNama.current?.value as string,
        email: email,
        birthdate: inputDate.current?.value as string,
        gender: valGender,
        phone: inputPhone.current?.value as number,
        password: password,
        pin: inputPin.current?.value as number,
        photoUrl: url,
      })
    } catch (e) {
      console.error(e)
    }
  }

  const insertHandler = async () => {
    const storageRef = ref(storage, fileName)
    uploadBytes(storageRef, selectedfile as Blob).then((snapshot) => {
      getDownloadURL(ref(storage, fileName)).then((url) => {
        addData(url)
        history.push('/login')
      })
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fill Your Profile</IonTitle>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
              <label htmlFor="actual-btn">
                <span className="profilepic_icon">
                  <BsCameraFill className="fas" />
                </span>
                <span className="profilepic_text">Edit Profile</span>
              </label>
              <input
                id="actual-btn"
                type="file"
                onChange={fileChangeHandler}
                hidden
              />
            </div>
          </div>
        </div>
        <div className="login-group">
          <div className="input-item-register">
            <IonLabel>
              <HiIdentification className="input-icon" />
            </IonLabel>
            <IonInput
              className="input-text"
              placeholder="Full Name"
              type="text"
              ref={inputNama}
            ></IonInput>
          </div>
          <div className="input-item-register">
            <IonLabel>
              <IonIcon className="input-icon" slot="start" icon={mail} />
            </IonLabel>
            <IonInput
              className="input-text"
              placeholder="Email"
              type="email"
              ref={inputEmail}
            ></IonInput>
          </div>
          <div className="input-item-register">
            <IonLabel>
              <IonIcon className="input-icon" slot="start" icon={calendar} />
            </IonLabel>
            <IonInput
              className="input-date"
              placeholder="Date of Birth"
              type="date"
              ref={inputDate}
            ></IonInput>
          </div>
          <div className="input-item-register">
            <IonLabel>
              <FaTransgender className="input-icon" />
            </IonLabel>
            <IonSelect
              className="gender-dropdown"
              interface="popover"
              placeholder="Select Gender"
              onIonChange={selectGender}
              value={gender}
            >
              <IonSelectOption className="item-dropdown" value="male">
                Male
              </IonSelectOption>
              <IonSelectOption className="item-dropdown" value="female">
                Female
              </IonSelectOption>
            </IonSelect>
          </div>
          <div className="input-item-register">
            <IonLabel>
              <BsFillTelephoneFill className="input-icon" />
            </IonLabel>
            <IonInput
              className="input-text"
              placeholder="Phone Number"
              type="number"
              ref={inputPhone}
            ></IonInput>
          </div>
          <div className="input-item-register">
            <IonLabel>
              <RiLockPasswordFill className="input-icon" />
            </IonLabel>
            <IonInput
              className="input-text"
              placeholder="Password"
              type="password"
              ref={inputPassword}
            ></IonInput>
          </div>
          <div className="input-item-register">
            <IonLabel>
              <AiTwotoneSecurityScan className="input-icon" />
            </IonLabel>
            <IonInput
              className="input-text"
              placeholder="Pin (Number Only 4 Digits)"
              max={4}
              type="number"
              ref={inputPin}
            ></IonInput>
          </div>
          <IonRow>
            <button
              style={{ marginTop: '10px', marginBottom: '5px' }}
              className="btn-login"
              onClick={insertHandler}
            >
              Sign Up
            </button>
          </IonRow>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default RegisterPage
