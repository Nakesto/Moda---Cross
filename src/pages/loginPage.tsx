import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import './loginPage.css'
import { useContext, useState } from 'react'
import loginImg from '../Assets/select_login.png'
import { lockClosed, mailUnread } from 'ionicons/icons'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaFacebook } from 'react-icons/fa'
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { Redirect, useHistory } from 'react-router'
import { ErrorMessage } from '@hookform/error-message'
import { auth, providerFacebook, providerGoogle } from '../firebase'
import { UserContext } from '../context/UserData'

export type DataUser = {
  token: string
  name: string
  email: string
  phone: number
  uid: string
  photoUrl: string
}

const LoginPage: React.FC = () => {
  const history = useHistory()
  const { isLoggedIn } = useContext(UserContext)
  const [errLogin, setErrLogin] = useState<string>()

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
        history.push('/home')
      })
      .catch((error) => {
        if (error.message == 'Firebase: Error (auth/invalid-email).') {
          setErrLogin('Please fill all require fields')
        }

        if (error.message == 'Firebase: Error (auth/user-not-found).') {
          setErrLogin('Email not found')
        }

        if (error.message == 'Firebase: Error (auth/wrong-password).') {
          setErrLogin('Wrong Password')
        }
      })
  }

  const loginFacebook = () => {
    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result)
        if (credential !== null) {
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
        }
        history.push('/home')
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log(credential)
      })
  }

  const checkKeyDown = (e: any) => {
    if (e.code === 'Enter') handleSubmit(onSubmit)
  }

  if (isLoggedIn) {
    return <Redirect to="/home" />
  }

  return (
    <IonPage className="page">
      <IonHeader className="head">
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
            <div className="error-message" style={{ color: 'red' }}>
              {errLogin}
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={(e) => checkKeyDown(e)}
            >
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
                <IonCheckbox
                  value="false"
                  style={{ marginRight: '5px' }}
                ></IonCheckbox>
                <IonLabel>Remember Me!</IonLabel>
              </div>
              <IonRow>
                <button type="submit" className="btn-login">
                  Sign In
                </button>
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
