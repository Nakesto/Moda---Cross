import { IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
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
    </IonRouterOutlet>
  );
};

export default GuestTabs;
