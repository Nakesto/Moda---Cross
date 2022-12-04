import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import {
  chatboxOutline,
  home,
  person,
  personCircle,
  storefront,
<<<<<<< HEAD
} from 'ionicons/icons'
import { Redirect, Route } from 'react-router'
import AddChat from './pages/AddChat'
import Cart from './pages/Cart'
import Chat from './pages/Chat'
import ChatDetail from './pages/ChatDetail'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Store from './pages/Store'
import StoreDetail from './pages/StoreDetail'
=======
} from "ionicons/icons";
import { Redirect, Route } from "react-router";
import AddChat from "./pages/AddChat";
import Cart from "./pages/Cart";
import Chat from "./pages/Chat";
import ChatDetail from "./pages/ChatDetail";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Store from "./pages/Store";
>>>>>>> master

const LoggedInTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={Home} />
        <Route exact path="/addchat" component={AddChat} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/detail" component={ChatDetail} />
<<<<<<< HEAD
        <Route exact path="/detailToko" component={StoreDetail} />
=======
        <Route exact path="/payment" component={Payment} />
>>>>>>> master
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="store" href="/store">
          <IonIcon icon={storefront} />
          <IonLabel>Store</IonLabel>
        </IonTabButton>

        <IonTabButton tab="chat" href="/chat">
          <IonIcon icon={chatboxOutline} />
          <IonLabel>Chat</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default LoggedInTabs
