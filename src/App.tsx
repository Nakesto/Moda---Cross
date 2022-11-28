import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import AddChat from "./pages/AddChat";

import SelectLoginPage from "./pages/SelectLogin";
import LoginPage from "./pages/loginPage";
<<<<<<< HEAD
import RegisterPage from "./pages/RegisterPage;
import Cart from "./pages/Cart";
=======
import RegisterPage from "./pages/RegisterPage";
import Chat from "./pages/Chat";
>>>>>>> fdc71a2 (hai)

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/selectlogin" component={SelectLoginPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/addchat" component={AddChat} />
<<<<<<< HEAD
        <Route exact path="/cart" component={Cart} />
=======
        <Route exact path="/chat" component={Chat} />
>>>>>>> fdc71a2 (hai)
        <Route exact path="/">
          <Redirect to="/selectlogin" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
