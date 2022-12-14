import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { chatbox, home, person, storefront } from 'ionicons/icons'
import { Redirect, Route } from 'react-router'
import Category from './pages/Category'
import Chat from './pages/Chat'
import ChatDetail from './pages/ChatDetail'
import Home from './pages/Home'
import Profile from './pages/Profile'
import RegisterSeller from './pages/RegisterSeller'
import Store from './pages/Store'

const LoggedInTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={Home} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/detail" component={ChatDetail} />
        <Route exact path="/regseller" component={RegisterSeller} />
        <Route exact path="/category" component={Category} />
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
          <IonIcon icon={chatbox} />
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
