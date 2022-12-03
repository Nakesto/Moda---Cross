<<<<<<< HEAD
import { isPlatform } from '@ionic/core'
import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { DataUser } from '../pages/loginPage'
import { signOut } from 'firebase/auth'

export type DataContext = {
  userData: DataUser | null
  isLoading: boolean
  isLoggedIn: boolean
  logOut: () => void
}
=======
import { isPlatform } from "@ionic/core";
import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { DataUser } from "../pages/loginPage";

export type DataContext = {
  userData: DataUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
};
>>>>>>> e1dc31d64977a2e5c29befec9cf17b1ec2bb451e

const initialValue: DataContext = {
  userData: null,
  isLoggedIn: false,
  isLoading: true,
<<<<<<< HEAD
  logOut: () => {},
}
=======
};
>>>>>>> e1dc31d64977a2e5c29befec9cf17b1ec2bb451e

const UserContext = createContext(initialValue);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [init, setInit] = useState(initialValue);
  const isApp = isPlatform("mobile");

  useEffect(() => {
    // if (isApp) {
    //   setInit({ ...init, isLoading: false });
    // }
    const unsub = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setInit({
          ...init,
          userData: {
            token: user.accessToken,
            name: user.displayName,
            email: user.email,
            phone: user.phoneNumber,
            uid: user.uid,
            photoUrl: user.photoURL,
          },
          isLoggedIn: true,
          isLoading: false,
        });
      } else {
        setInit({ ...init, isLoading: false });
      }
    });

    return () => {
      unsub();
    };
  }, []);

  const logOut = () => {
    setInit({ ...init, isLoading: true })
    signOut(auth)
      .then(() => {
        setInit({
          ...init,
          userData: null,
          isLoading: false,
          isLoggedIn: false,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <UserContext.Provider value={{ ...init }}>{children}</UserContext.Provider>
  );
};

export { UserProvider, UserContext };
