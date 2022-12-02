import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { DataUser } from "../pages/loginPage";

export type DataContext = {
  userData: DataUser | null;
  isLoggedIn: boolean;
  loggedIn: () => void;
};

const initialValue: DataContext = {
  userData: null,
  isLoggedIn: false,
  loggedIn: () => {},
};

const UserContext = createContext(initialValue);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [init, setInit] = useState(initialValue);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setInit({ ...init, isLoggedIn: true });
      }
    });

    return () => {
      unsub();
    };
  }, [init]);

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
