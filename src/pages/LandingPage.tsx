import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Gambar1 from "../Assets/Page1.png";
import Gambar2 from "../Assets/Page2.png";
import Gambar3 from "../Assets/Page3.png";
import "./LandingPage.css";

const LandingPage = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 900,
    swipeToSlide: false,
    swipe: false,
    draggable: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const sliderRef = useRef<any>();
  const [number, setNumber] = useState<number>(1);

  const gotoNext = () => {
    sliderRef.current.slickNext();
    setNumber((prev) => prev + 1);
  };

  return (
    <IonPage className="page">
      <IonHeader className="head"></IonHeader>
      <IonContent
        style={{
          backgroundColor: "red",
        }}
        className="content"
      >
        <Slider {...settings} ref={sliderRef}>
          <div>
            <div className="container-slide">
              <div className="slide-gambar">
                <img src={Gambar1} alt="gambar1" className="image" />
              </div>
              <div className="slide-text">
                <IonText
                  style={{
                    fontSize: "35px",
                    fontWeight: "800",
                    textAlign: "center",
                  }}
                >
                  Welcome to MODA!
                </IonText>
                <IonText
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Thrifting Application
                </IonText>
              </div>
            </div>
          </div>
          <div>
            <div className="container-slide">
              <div className="slide-gambar">
                <img src={Gambar2} alt="gambar1" className="image" />
              </div>
              <div className="slide-text">
                <IonText
                  style={{
                    fontSize: "35px",
                    fontWeight: "800",
                    textAlign: "center",
                  }}
                >
                  Improve your fashion with the Moda
                </IonText>
              </div>
            </div>
          </div>
          <div>
            <div className="container-slide">
              <div className="slide-gambar">
                <img src={Gambar3} alt="gambar1" className="image" />
              </div>
              <div className="slide-text">
                <IonText
                  style={{
                    fontSize: "35px",
                    fontWeight: "800",
                    textAlign: "center",
                  }}
                >
                  Let's find your clothing style with fashion
                </IonText>
              </div>
            </div>
          </div>
        </Slider>
        <div
          style={{
            height: "15vh",
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: "1024px",
            }}
          >
            {number <= 2 && (
              <IonButton color="primary" onClick={gotoNext} size="large">
                Next
              </IonButton>
            )}
            {number > 2 && (
              <Link to="/selectlogin">
                <IonButton color="primary" onClick={gotoNext} size="large">
                  Get Started!
                </IonButton>
              </Link>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
