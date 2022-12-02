import { isPlatform } from "@ionic/core";
import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { DataUser } from "../pages/loginPage";

export type DataContext = {
  userData: DataUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  loggedIn: () => void;
};

const initialValue: DataContext = {
  userData: null,
  isLoggedIn: false,
  isLoading: true,
  loggedIn: () => {},
};

const UserContext = createContext(initialValue);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [init, setInit] = useState(initialValue);
  const isApp = isPlatform("mobile");

  useEffect(() => {
    if (isApp) {
      setInit({ ...init, isLoading: false });
    }
    const unsub = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        console.log(user);
        setInit({
          ...init,
          userData: {
            token: user.accessToken,
            name: user.displayName,
            email: user.email,
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

  const loggedIn = () => {
    setInit({
      ...init,
      isLoggedIn: true,
    });

    console.log("panggil");
  };

  return (
    <UserContext.Provider value={{ ...init, loggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
