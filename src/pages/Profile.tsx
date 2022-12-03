import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
} from '@ionic/react'
import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import ProfilePic from '../../src/Assets/tom_holland.jpg'
import './Profile.css'

const Profile: React.FC = () => {
  return (
    <IonPage className="container">
      <IonContent className="content">
        <div className="content-profile">
          <div className="background-profile">
            <img className="bg-pic" src={ProfilePic} />
            <div className="box-transparent"></div>
            <div className="text-container">
              <div className="profile-text">
                <h3>Shawn Mendes</h3>
                <h3>
                  <FaMapMarkerAlt />
                  Jalan Jalan Kemana
                </h3>
              </div>
            </div>
          </div>
          <div className="profile-picture">
            <div className="circle-profile"></div>
            <img className="profile-pic" src={ProfilePic} />
          </div>
          <div className="btn-checkorder">
            <IonButton className="check-order">
              Check <br />
              Order
            </IonButton>
          </div>
        </div>
        <div className="information-profile">
          <IonGrid>
            <IonRow>
              <IonCol>
                <h2 className="text-information-detail">
                  <b>Full Name </b>
                </h2>
              </IonCol>
              <IonCol>
                <h2 className="text-information-detail">Full Name</h2>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <h2 className="text-information-detail">
                  <b>Email </b>
                </h2>
              </IonCol>
              <IonCol>
                <h2 className="text-information-detail">Full Name</h2>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <h2 className="text-information-detail">
                  <b>Phone Number </b>
                </h2>
              </IonCol>
              <IonCol>
                <h2 className="text-information-detail">Full Name</h2>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <h2 className="text-information-detail">
                  <b>Date of Birth </b>
                </h2>
              </IonCol>
              <IonCol>
                <h2 className="text-information-detail">Jalan Jalan</h2>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
        <div className="btn-register-seller">
          <IonButton className="register-seller">Register Seller</IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Profile
