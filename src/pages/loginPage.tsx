import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonBadge,
} from '@ionic/react'
import './loginPage.css'
import { useContext, useRef, useState } from 'react'
import loginImg from '../Assets/login.png'
import { lockClosed, mail, mailUnread } from 'ionicons/icons'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaFacebook } from 'react-icons/fa'
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { ErrorMessage } from '@hookform/error-message'
import { auth, providerFacebook, providerGoogle } from '../firebase'
import { UserProvider } from '../context/UserData'
import { Link } from 'react-router-dom'

export type DataUser = {
  token: string
  name: string
  email: string
  phoneNumber: number
  gender: string
  photoUrl: string
}

const LoginPage: React.FC = () => {
  const history = useHistory()
  const [userDat, setUserData] = useState<DataUser[]>([])

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data: any) => {
    signInWithEmailAndPassword(
      auth,
      data.email as string,
      data.password as string,
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        history.push('/home')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const loginFacebook = () => {
    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result)
        if (credential !== null) {
          const token = credential.accessToken

          const user = result.user
          history.push('/home')
        }
      })
      .catch((error) => {
        const credential = FacebookAuthProvider.credentialFromError(error)
        console.log(credential)
      })
  }

  const loginGoogle = () => {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        if (credential !== null) {
          const token = credential.accessToken

          const user = result.user
          console.log(user)
        }
        history.push('/home')
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log(credential)
      })
  }

  const loginApple = () => {}
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Sign in With Email</IonTitle>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="img-container">
          <img className="img-login" src={loginImg} />
          <h1 className="h1-login">
            <strong>Login to Your Account</strong>
          </h1>
          <div className="login-group">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-item">
                <IonLabel>
                  <IonIcon
                    className="input-icon"
                    slot="start"
                    icon={mailUnread}
                  />
                </IonLabel>
                <IonInput
                  {...register('email', {
                    required: 'This is a required field',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  placeholder="Email"
                  name="email"
                />
              </div>
              <ErrorMessage
                errors={errors}
                name="email"
                as={<div className="error-message" style={{ color: 'red' }} />}
              />
              <div className="input-item">
                <IonLabel>
                  <IonIcon
                    className="input-icon"
                    slot="start"
                    icon={lockClosed}
                  />
                </IonLabel>
                <IonInput
                  {...register('password', {
                    required: 'This is a required field',
                  })}
                  placeholder="Password"
                  name="password"
                  type="password"
                />
              </div>
              <div className="error-message">
                <ErrorMessage
                  errors={errors}
                  name="password"
                  as={
                    <div className="error-message" style={{ color: 'red' }} />
                  }
                />
              </div>
              <div className="check-box">
                <IonCheckbox style={{ marginRight: '5px' }}></IonCheckbox>
                <IonLabel>Remember Me!</IonLabel>
              </div>
              <IonRow>
                <button className="btn-login">Sign In</button>
              </IonRow>
            </form>
            <div className="line-1">
              <div
                style={{ flex: 1, height: '1px', backgroundColor: 'black' }}
              />
              <div>
                <p style={{ width: '140px', textAlign: 'center' }}>
                  or continue with
                </p>
              </div>
              <div
                style={{ flex: 1, height: '1px', backgroundColor: 'black' }}
              />
            </div>
            <IonRow>
              <IonButton
                fill="outline"
                className="btn-icon-login"
                onClick={loginFacebook}
              >
                <FaFacebook style={{ width: '50px', height: '30px' }} />
              </IonButton>
              <IonButton
                fill="outline"
                className="btn-icon-login"
                onClick={loginGoogle}
              >
                <FcGoogle style={{ width: '50px', height: '30px' }} />
              </IonButton>
              <IonButton
                fill="outline"
                style={{ paddingRight: '0px' }}
                className="btn-icon-login"
              >
                <FaApple
                  style={{ color: 'black', width: '50px', height: '30px' }}
                />
              </IonButton>
            </IonRow>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default LoginPage
