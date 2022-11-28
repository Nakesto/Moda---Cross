import { IonButton, IonContent, IonPage, IonRow } from '@ionic/react'
import './SelectLogin.css'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { MdOutgoingMail } from 'react-icons/md'

import SelectLogin from '../Assets/select.png'
import { useHistory } from 'react-router'

const SelectLoginPage: React.FC = () => {
  const history = useHistory()
  const goLogin = () => {
    let path = '/login'
    history.push(path)
  }

  const goToSignUp = () => {
    let path = '/register'
    history.push(path)
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
              <IonButton size="large" className="button-shape" fill="outline">
                <div className="btn-isi">
                  <FaFacebook className="btn-facebook" />
                  <h2 className="button-text">Continue with Facebook</h2>
                </div>
              </IonButton>
            </IonRow>
            <IonRow>
              <IonButton size="large" className="button-shape" fill="outline">
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
              >
                <div className="btn-isi">
                  <FaApple className="btn-icon-apple" />
                  <h2 className="button-text">Continue with Apple</h2>
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
              <button className="button-shape-signin" onClick={goLogin}>
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
            </IonRow>
            <IonRow>
              <h5
                style={{ fontSize: '15px', marginTop: '10px', marginLeft: '0' }}
              >
                Don't have an account?
              </h5>
              <a
                style={{
                  fontSize: '15px',
                  marginTop: '10px',
                  textDecorationLine: 'underline',
                  marginLeft: '5px',
                  cursor: 'pointer',
                }}
                onClick={goToSignUp}
              >
                Sign Up
              </a>
            </IonRow>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default SelectLoginPage
