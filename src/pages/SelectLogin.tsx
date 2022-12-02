import { IonButton, IonContent, IonPage, IonRow } from "@ionic/react";
import "./SelectLogin.css";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";

import SelectLogin from "../Assets/select.png";
import { useHistory, useLocation } from "react-router";
import { auth, providerGoogle, providerFacebook } from "../firebase";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserData";

const SelectLoginPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { isLoggedIn } = useContext(UserContext);

  const loginGoogle = () => {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential !== null) {
          const token = credential.accessToken;

          const user = result.user;
          history.push("/register");
        }
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  };

  const loginApple = () => {};

  const loginFacebook = () => {
    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        if (credential !== null) {
          const token = credential.accessToken;

          const user = result.user;
          history.push("/register");
        }
      })
      .catch((error) => {
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  };

  useEffect(() => {
    if (isLoggedIn == true) {
      history.replace("/home");
    }
  }, [location.pathname]);

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
                style={{ marginBottom: "0px" }}
                size="large"
                className="button-shape"
                fill="outline"
                onClick={loginApple}
              >
                <div className="btn-isi">
                  <FaApple className="btn-icon-apple" />
                  <h2 className="button-text">Continue with Apple</h2>
                </div>
              </IonButton>
            </IonRow>
            <div className="line-1">
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "black" }}
              />
              <div>
                <p style={{ width: "70px", textAlign: "center" }}>OR</p>
              </div>
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "black" }}
              />
            </div>
            <IonRow>
              <a href="/login">
                <button className="button-shape-signin">
                  <MdOutgoingMail
                    style={{
                      color: "white",
                      width: "40px",
                      height: "30px",
                      paddingRight: "10px",
                    }}
                  />
                  <h2 className="button-text">Sign In With Email</h2>
                </button>
              </a>
            </IonRow>
            <IonRow>
              <h5
                style={{ fontSize: "15px", marginTop: "10px", marginLeft: "0" }}
              >
                Don't have an account?
              </h5>
              <a
                style={{
                  fontSize: "15px",
                  marginTop: "10px",
                  textDecorationLine: "underline",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                href="/register"
              >
                Sign Up
              </a>
            </IonRow>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SelectLoginPage;
