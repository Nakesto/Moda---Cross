import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  withIonLifeCycle,
} from "@ionic/react";
import {
  cartOutline,
  chatboxOutline,
  home,
  personCircle,
} from "ionicons/icons";
import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router";
import AddChat from "./pages/AddChat";
import Cart from "./pages/Cart";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Store from "./pages/Store";

const LoggedInTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/addchat" component={AddChat} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/cart" component={Cart} />
        <Redirect to="/" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="store" href="/store">
          <IonIcon icon={personCircle} />
          <IonLabel>Store</IonLabel>
        </IonTabButton>

        <IonTabButton tab="chat" href="/chat">
          <IonIcon icon={chatboxOutline} />
          <IonLabel>Chat</IonLabel>
        </IonTabButton>

        <IonTabButton tab="cart" href="/cart">
          <IonIcon icon={cartOutline} />
          <IonLabel>Cart</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default LoggedInTabs;
