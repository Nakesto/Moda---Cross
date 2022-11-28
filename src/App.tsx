import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import Home from './pages/Home'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
<<<<<<< HEAD
import './theme/variables.css'
import AddChat from './pages/AddChat'
=======
import "./theme/variables.css";
import AddChat from "./pages/AddChat";

import SelectLoginPage from "./pages/SelectLogin";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage;
import Cart from "./pages/Cart";
>>>>>>> d1dea47216ec24f183fbac8df72c91e31d2f46e0

import SelectLoginPage from './pages/SelectLogin'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/RegisterPage'
import Cart from './pages/Cart'

setupIonicReact()

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/selectlogin" component={SelectLoginPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/addchat" component={AddChat} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/">
          <Redirect to="/selectlogin" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
)

export default App
