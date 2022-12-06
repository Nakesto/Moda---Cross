import { IonButton, IonText } from '@ionic/react'
import React from 'react'
import Tom from '../Assets/tom_holland.jpg'

const CardHero = () => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        paddingLeft: '5px',
        paddingRight: '5px',
      }}
    >
      <img
        src="https://lzd-img-global.slatic.net/g/p/c4cfb0200286f9a6536b19fdb9b206e1.png_720x720q80.jpg_.webp"
        alt="Baju"
        width="150px"
        height="125px"
        style={{
          borderRadius: '15px',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <IonText
          style={{
            fontWeight: '400',
            fontSize: '20px',
            marginBottom: '5px',
          }}
        >
          Sale!
        </IonText>
        <IonText
          style={{
            fontWeight: '600',
            fontSize: '25px',
          }}
        >
          Pull & Bear
        </IonText>
        <IonButton size="small">Buy Now</IonButton>
      </div>
    </div>
  )
}

export default CardHero
