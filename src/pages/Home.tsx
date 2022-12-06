import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
// import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "../firebase";
import { cartOutline } from "ionicons/icons";
import Slider from "react-slick";
import CardHero from "../components/CardHero";
import { FaTshirt } from "react-icons/fa";
import { GiArmoredPants, GiHandBag, GiSonicShoes } from "react-icons/gi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import "./Home2.css";
import CardProduct from "../components/CardProduct";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import ModalFull from "../components/ModalFull";

export type Product = {
  name: string;
  toko: {
    name: string;
    uid: string;
    province: string;
  };
  price: string;
  description: string;
  uid: string;
  stock: number;
  image: string;
};

const Home: React.FC = () => {
  const history = useHistory();
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
  };

  const [newProduct, setNewProduct] = useState<Product[]>([]);

  const [present, dismiss] = useIonModal(ModalFull, {
    onDismiss: (data: { product: any }, role: string) => dismiss(data, role),
    role: "product",
  });

  useEffect(() => {
    const getProduct = async () => {
      const q = query(collection(db, "product"), limit(5));
      const querySnapshot = await getDocs(q);
      const data: Product[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data() as Product);
      });

      setNewProduct(data);
    };

    getProduct();
  }, []);

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "goToCart") {
          history.push("/cart");
        }

        if (ev.detail.role === "goToProduct") {
          const product = ev.detail.data.product;
          history.push("/detailProduct", { product });
        }
      },
    });
  }

  return (
    <IonPage className="container">
      <IonHeader className="head">
        <IonToolbar
          color="primary"
          style={{
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
          className="center"
        >
          <IonText
            style={{
              marginTop: "9px",
            }}
            slot="start"
            className="text-toolbar"
          >
            MODA
          </IonText>
          <IonSearchbar
            style={{
              marginTop: "9px",
            }}
            onClick={() => openModal()}
          ></IonSearchbar>
          <IonRow slot="end">
            <Link to="/cart">
              <IonButton>
                <IonIcon slot="icon-only" icon={cartOutline}></IonIcon>
              </IonButton>
            </Link>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <div
          style={{
            height: "90vh",
            overflow: "scroll",
          }}
        >
          <div className="test"></div>
          <div
            style={{
              marginTop: "-4rem",
              backgroundColor: "white",
              marginLeft: "17px",
              marginRight: "17px",
              paddingRight: "10px",
              paddingLeft: "10px",
              paddingTop: "15px",
              paddingBottom: "25px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgb(0 0 0 / 0.3)",
            }}
            className="ion-padding-horizontal"
          >
            <Slider {...settings}>
              <div>
                <CardHero />
              </div>
              <div>
                <CardHero />
              </div>
              <div>
                <CardHero />
              </div>
            </Slider>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "17px",
              marginRight: "17px",
              marginTop: "1.5rem",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "600",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  maxWidth: "200px",
                  padding: "13px",
                }}
                className="button-category"
                onClick={() => history.push("/category", { category: "top" })}
              >
                <FaTshirt
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </button>
              <IonText>Shirt</IonText>
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "600",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  maxWidth: "200px",
                  padding: "13px",
                }}
                className="button-category"
                onClick={() => history.push("/category", { category: "pants" })}
              >
                <GiArmoredPants
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </button>
              <IonText>Pants</IonText>
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "600",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  maxWidth: "200px",
                  padding: "13px",
                }}
                className="button-category"
                onClick={() => history.push("/category", { category: "shoes" })}
              >
                <GiSonicShoes
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </button>
              <IonText>Shoes</IonText>
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "600",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  maxWidth: "200px",
                  padding: "13px",
                }}
                className="button-category"
                onClick={() => history.push("/category", { category: "bag" })}
              >
                <GiHandBag
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </button>
              <IonText>Bag</IonText>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              paddingRight: "17px",
              paddingLeft: "17px",
              marginTop: "15px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IonText
                style={{
                  fontSize: "30px",
                  fontWeight: "600",
                }}
              >
                New products
              </IonText>
              <IonButton size="small">View All</IonButton>
            </div>
            <div
              style={{
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  overflow: "scroll",
                }}
                className="example"
              >
                {newProduct.map((product) => (
                  <div key={product.name}>
                    <CardProduct product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <div
            style={{
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
                overflow: "scroll",
                marginBottom: "60px",
              }}
              className="example"
            >
              {newProduct.map((product) => (
                <div key={product.name}>
                  <CardProduct product={product} />
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
