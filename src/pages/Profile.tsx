import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
} from '@ionic/react'
import React, { useContext, useEffect } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { UserContext } from '../context/UserData'
import { FiLogOut } from 'react-icons/fi'
import './Profile.css'
// import { signOut } from 'firebase/auth'
// import { auth } from '../firebase'
const Profile: React.FC = () => {
  const { isLoggedIn, userData, logOut } = useContext(UserContext)
  // useEffect(() => {
  //   console.log(userData)
  // }, [isLoggedIn, userData])

  // const logOut = () => {
  //   signOut(auth)
  //     .then(() => {})
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  return (
    <IonPage className="container">
      <IonContent className="content">
        <div className="content-profile">
          <div className="background-profile">
            <img className="bg-pic" src={userData?.photoUrl} />
            <div className="box-transparent"></div>
            <div className="btn-logout-container">
              <div className="btn-logout">
                <IonButton
                  onClick={() => {
                    logOut()
                  }}
                >
                  <FiLogOut style={{ marginRight: '5px' }} />
                  Logout
                </IonButton>
              </div>
            </div>
            <div className="text-container">
              <div className="profile-text">
                <h3>{userData?.name}</h3>
                <h3>
                  <FaMapMarkerAlt />
                  Jalan Jalan Kemana
                </h3>
              </div>
            </div>
          </div>
          <div className="profile-picture">
            <div className="circle-profile"></div>
            <img className="profile-pic" src={userData?.photoUrl} />
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
                <h2 className="text-information-detail">{userData?.name}</h2>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <h2 className="text-information-detail">
                  <b>Email </b>
                </h2>
              </IonCol>
              <IonCol>
                <h2 className="text-information-detail">{userData?.email}</h2>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <h2 className="text-information-detail">
                  <b>Phone Number </b>
                </h2>
              </IonCol>
              <IonCol>
                <h2 className="text-information-detail">{userData?.phone}</h2>
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
