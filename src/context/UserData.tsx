import React, { createContext, useState } from "react";
import { DataUser } from "../pages/loginPage";

export type DataContext = {
  userData: DataUser[];
  isLoggedIn: boolean;
  loggedIn: () => void;
};

const initialValue: DataContext = {
  userData: [],
  isLoggedIn: false,
  loggedIn: () => {},
};

const UserContext = createContext(initialValue);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [init, setInit] = useState(initialValue);

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
