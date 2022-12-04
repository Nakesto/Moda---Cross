import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
  IonPage,
  IonRouterOutlet,
  IonSpinner,
  setupIonicReact,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

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
import './theme/variables.css'
import SelectLoginPage from './pages/SelectLogin'
import LoggedInTabs from './LoggedInTabs'
import { useContext } from 'react'
import { UserContext } from './context/UserData'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './ProtectedRoute'
import ProdukDetail from './pages/ProdukDetail'
import StoreDetail from './pages/StoreDetail'

setupIonicReact()

const App: React.FC = () => {
  const { isLoading } = useContext(UserContext)
  return (
    <IonApp>
      {isLoading === true ? (
        <IonPage
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IonSpinner color="black" name="lines"></IonSpinner>
        </IonPage>
      ) : (
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/selectlogin" component={SelectLoginPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/detailToko" component={StoreDetail} />
            <Route exact path="/detailProduct" component={ProdukDetail} />
            <ProtectedRoute>
              <LoggedInTabs />
            </ProtectedRoute>
          </IonRouterOutlet>
        </IonReactRouter>
      )}
    </IonApp>
  )
}

export default App
