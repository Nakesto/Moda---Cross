import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./RegisterPage.css";
import { useContext, useEffect, useState } from "react";
import { mail, calendar } from "ionicons/icons";
import { FaTransgender } from "react-icons/fa";
import { BsCameraFill, BsFillTelephoneFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi";
import { AiTwotoneSecurityScan } from "react-icons/ai";
import profile from "../Assets/profile.png";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { storage, auth, db } from "../firebase";
import { UserContext } from "../context/UserData";

const RegisterPage: React.FC = () => {
  const [takenPhoto, setTakenPhoto] = useState<string>();
  const [selectedfile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState("profile.png");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [errorEmail, setErrorEmail] = useState<string>();
  const selectGender = (event: CustomEvent) => {
    const selectedGender = event.detail.value;
    setGender(selectedGender);
  };
  const history = useHistory();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const location = useLocation();
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (isLoggedIn === true) {
      history.push("/home");
    }
  }, [location.pathname, isLoggedIn, history]);

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0]);
    setFileName(event.target!.files![0].name);
    setTakenPhoto(URL.createObjectURL(event.target!.files![0]));
  };
  const onSubmit = (data: any) => {
    setErrorEmail("");
    const storageRef = ref(storage, fileName);
    uploadBytes(storageRef, selectedfile as Blob).then((snapshot) => {
      getDownloadURL(ref(storage, fileName)).then((url) => {
        addData(url);
      });
    });

    const addData = async (url: string) => {
      const valGender = gender as string;
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email as string,
          data.password as string
        );

        await updateProfile(userCredential.user, {
          displayName: data.fullname as string,
          photoURL: url,
        });

        const docRef = await addDoc(collection(db, "user"), {
          name: data.fullname as string,
          email: data.email as string,
          birthdate: data.birthdate as string,
          gender: valGender,
          phone: data.phone as number,
          password: data.password,
          pin: data.pin as number,
          photoUrl: url,
          uid: userCredential.user.uid as string,
        });

        //create empty user chats on firestore
        await setDoc(doc(db, "userChats", userCredential.user.uid), {});

        history.push("/login");
      } catch (error) {
        setErrorEmail("Email already registered!");
      }
    };
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Fill Your Profile</IonTitle>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-img">
            <div className="profilepic">
              {takenPhoto && (
                <img
                  className="profilepic_image"
                  src={takenPhoto}
                  width="150"
                  height="150"
                  alt="Profibild"
                />
              )}
              {!takenPhoto && (
                <img
                  className="profilepic_image"
                  src={profile}
                  width="150"
                  height="150"
                  alt="Profibild"
                />
              )}
              <div className="profilepic_content">
                <label htmlFor="actual-btn">
                  <span className="profilepic_icon">
                    <BsCameraFill className="fas" />
                  </span>
                  <span className="profilepic_text">Edit Profile</span>
                </label>
                <input
                  id="actual-btn"
                  type="file"
                  onChange={fileChangeHandler}
                  hidden
                />
              </div>
            </div>
          </div>
          <div className="login-group">
            <div className="input-item-register">
              <IonLabel>
                <HiIdentification className="input-icon" />
              </IonLabel>
              <IonInput
                {...register("fullname", {
                  required: "This is a required field",
                  minLength: {
                    value: 3,
                    message: "Name cannot be less than 3 chars!",
                  },
                })}
                placeholder="Fullname"
                className="input-text"
                name="fullname"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="fullname"
              as={<div className="error-message" style={{ color: "red" }} />}
            />
            <div className="input-item-register">
              <IonLabel>
                <IonIcon className="input-icon" slot="start" icon={mail} />
              </IonLabel>
              <IonInput
                {...register("email", {
                  required: "This is a required field",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email"
                className="input-text"
                name="email"
              />
            </div>
            <div className="error-message" style={{ color: "red" }}>
              {errorEmail}
            </div>
            <ErrorMessage
              errors={errors}
              name="email"
              as={<div className="error-message" style={{ color: "red" }} />}
            />
            <div className="input-item-register">
              <IonLabel>
                <IonIcon className="input-icon" slot="start" icon={calendar} />
              </IonLabel>
              <IonInput
                {...register("birthdate", {
                  required: "This is a required field",
                })}
                className="input-date"
                placeholder="Birthdate"
                type="date"
                name="birthdate"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="birthdate"
              as={<div className="error-message" style={{ color: "red" }} />}
            />
            <div className="input-item-register">
              <IonLabel>
                <FaTransgender className="input-icon" />
              </IonLabel>
              <IonSelect
                className="gender-dropdown"
                interface="popover"
                placeholder="Select Gender"
                onIonChange={selectGender}
                value={gender}
              >
                <IonSelectOption className="item-dropdown" value="male">
                  Male
                </IonSelectOption>
                <IonSelectOption className="item-dropdown" value="female">
                  Female
                </IonSelectOption>
              </IonSelect>
            </div>
            <div className="input-item-register">
              <IonLabel>
                <BsFillTelephoneFill className="input-icon" />
              </IonLabel>
              <IonInput
                {...register("phone", {
                  required: "This is a required field",
                  minLength: {
                    value: 11,
                    message: "Phone number cannot less than 11 number!",
                  },
                  maxLength: {
                    value: 13,
                    message: "Phone number cannot more than 13 number!",
                  },
                })}
                className="input-text"
                placeholder="Phone Number"
                type="number"
                name="phone"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="phone"
              as={<div className="error-message" style={{ color: "red" }} />}
            />
            <div className="input-item-register">
              <IonLabel>
                <RiLockPasswordFill className="input-icon" />
              </IonLabel>
              <IonInput
                {...register("password", {
                  required: "This is a required field",
                  minLength: {
                    value: 8,
                    message: "Password cannot less than 8 chars!",
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                    message: "Password must be have uppercase and number!",
                  },
                })}
                className="input-text"
                placeholder="Password"
                type="password"
                name="password"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="password"
              as={<div className="error-message" style={{ color: "red" }} />}
            />
            <div className="input-item-register">
              <IonLabel>
                <AiTwotoneSecurityScan className="input-icon" />
              </IonLabel>
              <IonInput
                {...register("pin", {
                  required: "This is a required field",
                  pattern: {
                    value: /[0-9]/,
                    message: "Pin must be number!",
                  },
                  minLength: {
                    value: 4,
                    message: "Pin must be 4 numbers!",
                  },
                  maxLength: {
                    value: 4,
                    message: "Pin must be 4 numbers!",
                  },
                })}
                className="input-text"
                placeholder="Pin (4 Numbers)"
                type="password"
                name="pin"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="pin"
              as={<div className="error-message" style={{ color: "red" }} />}
            />
            <IonRow>
              <button
                style={{ marginTop: "10px", marginBottom: "5px" }}
                className="btn-login"
              >
                Sign Up
              </button>
            </IonRow>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
