import { IonButton, IonContent, IonPage, IonRow } from '@ionic/react'
import './SelectLogin.css'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { MdOutgoingMail } from 'react-icons/md'

import SelectLogin from '../Assets/select.png'
import { Redirect, useHistory, useLocation } from 'react-router'
import { auth, providerGoogle, providerFacebook } from '../firebase'
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from 'firebase/auth'
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserData'
import { Link } from 'react-router-dom'
import { BsTwitter } from 'react-icons/bs'

const SelectLoginPage: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { isLoggedIn } = useContext(UserContext)

  const loginGoogle = () => {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        if (credential !== null) {
          const token = credential.accessToken

          const user = result.user
          console.log(user)
          history.push('/home')
        }
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log(credential)
      })
  }

  const loginTwitter = () => {
    const providerTwitter = new TwitterAuthProvider()
    signInWithPopup(auth, providerTwitter)
      .then((result) => {
        // The signed-in user info.
        const user = result.user

        // This gives you a Twitter Access Token. You can use it to access the Facebook API.
        const credential = TwitterAuthProvider.credentialFromResult(result)
        if (credential !== null) {
          const token = credential.accessToken

          const user = result.user
          history.push('/home')
        }
      })
      .catch((error) => {
        const credential = TwitterAuthProvider.credentialFromError(error)
        console.log(credential)
      })
  }

  const loginFacebook = () => {
    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        // The signed-in user info.
        const user = result.user

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

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (isLoggedIn) {
    return <Redirect to="/home" />
  }

  return (
    <IonPage className="container">
      <IonContent>
        <div className="content-select">
          <img className="img-select-login" src={SelectLogin} />
          <h1 className="ion-h1">
            <strong>Let's you in</strong>
          </h1>
          <div className="container-group">
            <IonRow>
              <IonButton
                size="large"
                className="button-shape"
                fill="outline"
                onClick={loginFacebook}
              >
                <div className="btn-isi">
                  <FaFacebook className="btn-facebook" />
                  <h2 className="button-text">Continue with Facebook</h2>
                </div>
              </IonButton>
            </IonRow>
            <IonRow>
              <IonButton
                size="large"
                className="button-shape"
                fill="outline"
                onClick={loginGoogle}
              >
                <div className="btn-isi">
                  <FcGoogle className="btn-icon-google" />
                  <h2 className="button-text">Continue with Google</h2>
                </div>
              </IonButton>
            </IonRow>
            <IonRow>
              <IonButton
                style={{ marginBottom: '0px' }}
                size="large"
                className="button-shape"
                fill="outline"
                onClick={loginTwitter}
              >
                <div className="btn-isi">
                  <BsTwitter className="btn-icon-apple" />
                  <h2 className="button-text">Continue with Twitter</h2>
                </div>
              </IonButton>
            </IonRow>
            <div className="line-1">
              <div
                style={{ flex: 1, height: '1px', backgroundColor: 'black' }}
              />
              <div>
                <p style={{ width: '70px', textAlign: 'center' }}>OR</p>
              </div>
              <div
                style={{ flex: 1, height: '1px', backgroundColor: 'black' }}
              />
            </div>
            <IonRow>
              <Link to="/login">
                <button className="button-shape-signin">
                  <MdOutgoingMail
                    style={{
                      color: 'white',
                      width: '40px',
                      height: '30px',
                      paddingRight: '10px',
                    }}
                  />
                  <h2 className="button-text">Sign In With Email</h2>
                </button>
              </Link>
            </IonRow>
            <IonRow>
              <h5
                style={{ fontSize: '15px', marginTop: '10px', marginLeft: '0' }}
              >
                Don't have an account?
              </h5>
              <Link
                style={{
                  fontSize: '15px',
                  marginTop: '10px',
                  textDecorationLine: 'underline',
                  marginLeft: '5px',
                  cursor: 'pointer',
                }}
                to="/register"
              >
                Sign Up
              </Link>
            </IonRow>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default SelectLoginPage
