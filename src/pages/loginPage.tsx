import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import './loginPage.css'
import { useRef, useState } from 'react'
import loginImg from '../Assets/login.png'
import { mail, lockClosed } from 'ionicons/icons'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { getAuth } from 'firebase/auth'

const LoginPage: React.FC = () => {
  const inputEmail = useRef<HTMLIonInputElement>(null)
  return (
    <IonPage className="container">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign in With Email</IonTitle>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container-login">
          <img className="img-login" src={loginImg} />
          <h1 className="h1-login">
            <strong>Login to Your Account</strong>
          </h1>
          <div className="login-group">
            <div className="input-item">
              <IonLabel>
                <IonIcon className="input-icon" slot="start" icon={mail} />
              </IonLabel>
              <IonInput
                className="input-text"
                placeholder="Email"
                type="email"
              ></IonInput>
            </div>
            <div className="input-item">
              <IonLabel>
                <IonIcon
                  className="input-icon"
                  slot="start"
                  icon={lockClosed}
                />
              </IonLabel>
              <IonInput
                className="input-text"
                placeholder="Password"
                type="password"
              ></IonInput>
            </div>
            <IonItem lines="none">
              <IonCheckbox slot="start"></IonCheckbox>
              <IonLabel>Remember Me</IonLabel>
            </IonItem>
            <IonRow>
              <button className="btn-login">Sign In</button>
            </IonRow>
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
              <IonButton fill="outline" className="btn-icon-login">
                <FaFacebook style={{ width: '50px', height: '30px' }} />
              </IonButton>
              <IonButton fill="outline" className="btn-icon-login">
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
