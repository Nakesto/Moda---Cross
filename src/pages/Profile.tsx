import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
} from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { UserContext } from '../context/UserData'
import { FiLogOut } from 'react-icons/fi'
import './Profile.css'
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'
const Profile: React.FC = () => {
  const { userData, logOut } = useContext(UserContext)
  const [datas, setDatas] = useState({
    photoUrls: '',
    names: '',
    phoneNumber: 0,
    gender: '',
    birthdate: '',
  })
  useEffect(() => {
    const singleUser = query(
      collection(db, 'user'),
      where('uid', '==', userData?.uid),
    )
    const unsub = onSnapshot(singleUser, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setDatas({
          photoUrls: doc.data().photoUrl,
          names: doc.data().name,
          phoneNumber: doc.data().phone,
          gender: doc.data().gender,
          birthdate: doc.data().birthdate,
        })
        // console.log(doc.data())
      })
    })
    return () => {
      unsub()
    }
  }, [userData?.uid])

  console.log(datas)

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
                  className="register-seller"
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
                <h3>{datas.names}</h3>
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
        </div>
        <div className="btn-container-profile">
          <IonButton className="register-seller">Register Seller</IonButton>
          <IonButton className="register-seller">Check Order</IonButton>
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
                <h2 className="text-information-detail">{datas.phoneNumber}</h2>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <h2 className="text-information-detail">
                  <b>Date of Birth </b>
                </h2>
              </IonCol>
              <IonCol>
                <h2 className="text-information-detail">{datas.birthdate}</h2>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Profile
