import { IonRouterOutlet, withIonLifeCycle } from "@ionic/react";
import React, { useContext, useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router";
import { UserContext } from "./context/UserData";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import SelectLoginPage from "./pages/SelectLogin";

const GuestTabs = () => {
  return (
    <IonRouterOutlet>
      <Route exact path="/">
        <Redirect to="/selectlogin" />
      </Route>
      <Route exact path="/selectlogin" component={SelectLoginPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Redirect to="/" />
    </IonRouterOutlet>
  );
};

export default GuestTabs;
