import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCheckbox, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonNote, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import './RegisterPage.css'
import { useRef, useState } from 'react';
import { mail,  calendar } from 'ionicons/icons';
import { FaTransgender} from "react-icons/fa";
import { BsCameraFill, BsFillTelephoneFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi";
import { AiTwotoneSecurityScan } from "react-icons/ai";
import profile from '../Assets/tom_holland.jpg'

const RegisterPage: React.FC = () => {
    const inputEmail = useRef<HTMLIonInputElement>(null);

    return (
        <IonPage>
        <IonHeader>
                <IonToolbar>
                    <IonTitle>Fill Your Profile</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className='container-img'>
                  <div className="profilepic">
                    <img className="profilepic_image" src={profile} width="150" height="150" alt="Profibild" />
                    <div className="profilepic_content">
                      <span className="profilepic_icon"><BsCameraFill className='fas'/></span>
                      <span className="profilepic_text">Edit Profile</span>
                    </div>
                  </div>
                </div>
                <IonGrid className='login-group'>
                    <div  className="input-item">
                        <IonLabel><HiIdentification className='input-icon' /></IonLabel>
                        <IonInput  className='input-text' placeholder='Full Name' type="text"></IonInput>
                    </div>
                    <div  className="input-item">
                        <IonLabel><IonIcon className='input-icon' slot="start" icon={mail}/></IonLabel>
                        <IonInput  className='input-text' placeholder='Email' type="email"></IonInput>
                    </div>
                    <div  className="input-item">
                        <IonLabel><IonIcon className='input-icon' slot="start" icon={calendar}/></IonLabel>
                        <IonInput className="input-date" placeholder="Date of Birth" type='date'></IonInput>
                    </div>
                    <div  className="input-item">
                        <IonLabel><FaTransgender className='input-icon'/></IonLabel>
                        <IonSelect className='gender-dropdown' interface="popover" placeholder="Select Gender">
                          <IonSelectOption className="item-dropdown" value="male">Male</IonSelectOption>
                          <IonSelectOption className="item-dropdown"  value="female">Female</IonSelectOption>
                        </IonSelect>
                    </div>
                    <div  className="input-item">
                        <IonLabel><BsFillTelephoneFill className='input-icon'  /></IonLabel>
                        <IonInput  className='input-text' placeholder='Phone Number' type="tel" maxlength={13}></IonInput>
                    </div>
                    <div  className="input-item">
                        <IonLabel><RiLockPasswordFill className='input-icon'  /></IonLabel>
                        <IonInput  className='input-text' placeholder='Password' type="password"></IonInput>
                    </div>
                    <div  className="input-item">
                        <IonLabel><AiTwotoneSecurityScan className='input-icon'  /></IonLabel>
                        <IonInput  className='input-text' placeholder='Pin (Number Only 4 Digits)' pattern="[0-9]+" maxlength={4} type="password"></IonInput>
                    </div>
                    <IonRow>
                        <button  className='btn-login'>Sign Up</button>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default RegisterPage;
