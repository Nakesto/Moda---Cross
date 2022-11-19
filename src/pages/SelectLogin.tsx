import { IonButton, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './SelectLogin.css';
import { logoApple, logoFacebook, logoGoogle, mail } from 'ionicons/icons';
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook} from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";

import SelectLogin from '../Assets/select.png'; 
import { Redirect, useHistory } from 'react-router';

const SelectLoginPage: React.FC = () => {

  const history = useHistory();
  const goLogin = () =>{
    let path = '/login'
    history.push(path);
  }

  const goToSignUp = () =>{
    let path = '/register'
    history.push(path);
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="img-select-login">
          <img  src={SelectLogin}/>
        </div>
        <h1 className='ion-h1'><strong>Let's you in</strong></h1>
        <IonGrid className='container-group'>
          <IonRow>
            <IonButton size="large" className='button-shape' fill='outline'><FaFacebook style={{color:'#3880ff', width: '40px', height:'30px', paddingRight:'10px', marginLeft:'20px'}}/><h2 className='button-text'>Continue with Facebook</h2></IonButton>
          </IonRow>
          <IonRow>
            <IonButton size="large" className='button-shape' fill='outline'><FcGoogle style={{width: '40px', height:'30px', paddingRight:'10px'}}/><h2 className='button-text'>Continue with Google</h2></IonButton>
          </IonRow>
          <IonRow>
            <IonButton size="large" className='button-shape' fill='outline'><FaApple style={{color:"black", width: '40px', height:'30px', paddingRight:'15px', marginLeft:'-10px'}}/><h2 className='button-text'>Continue with Apple</h2></IonButton>
          </IonRow>
          <div style={{display: 'flex', width:'350px', flexDirection: 'row', alignItems: 'center', paddingRight: '.5rem', paddingLeft: '.5rem'}}>
            <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
            <div>
              <p style={{width: '70px', textAlign: 'center'}}>OR</p>
            </div>
            <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
          </div>
          <IonRow>
            <button  className='button-shape-signin' onClick={goLogin}><MdOutgoingMail style={{color:"white", width: '40px', height:'30px', paddingRight:'10px'}}/><h2 className='button-text'>Sign In With Email</h2></button>
          </IonRow>
          <IonRow>
            <h5 style={{fontSize: '15px', marginTop:'10px', marginLeft:'0'}}>Don't have an account?</h5>
            <a style={{fontSize: '15px', marginTop:'10px', textDecorationLine:'underline', marginLeft:'5px', cursor:"pointer"}} onClick={goToSignUp}>Sign Up</a>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SelectLoginPage;
