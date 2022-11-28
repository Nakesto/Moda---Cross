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
} from "@ionic/react";
import "./loginPage.css";
import { useRef, useState } from "react";
import loginImg from "../Assets/login.png";
import { mail, lockClosed } from "ionicons/icons";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const inputEmail = useRef<HTMLIonInputElement>(null);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign in With Email</IonTitle>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="img-container">
          <img className="img-login" src={loginImg} />
        </div>
        <h1 className="h1-login">
          <strong>Login to Your Account</strong>
        </h1>
        <IonGrid className="login-group">
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
              <IonIcon className="input-icon" slot="start" icon={lockClosed} />
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
            <Link to="/home">
              <button className="btn-login">Sign In</button>
            </Link>
          </IonRow>
          <div
            style={{
              display: "flex",
              width: "350px",
              flexDirection: "row",
              alignItems: "center",
              paddingRight: ".5rem",
              paddingLeft: ".5rem",
            }}
          >
            <div style={{ flex: 1, height: "1px", backgroundColor: "black" }} />
            <div>
              <p style={{ width: "140px", textAlign: "center" }}>
                or continue with
              </p>
            </div>
            <div style={{ flex: 1, height: "1px", backgroundColor: "black" }} />
          </div>
          <IonRow>
            <IonButton fill="outline" className="btn-icon-login">
              <FaFacebook />
            </IonButton>
            <IonButton fill="outline" className="btn-icon-login">
              <FcGoogle />
            </IonButton>
            <IonButton fill="outline" className="btn-icon-login">
              <FaApple style={{ color: "black" }} />
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
