import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { flameOutline, shirtOutline, analytics } from 'ionicons/icons';
import Activity from './pages/Activity';
import Listings from './pages/Listings';
import Insights from './pages/Insights';
import PostPage from './pages/PostPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/activity">
            <Activity />
          </Route>
          <Route exact path="/listings">
            <Listings />
          </Route>
          <Route path="/insights">
            <Insights />
          </Route>
          <Route exact path="/">
            <Redirect to="/activity" />
          </Route>
          <Route path="/post">
            <PostPage />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Activity" href="/activity">
            <IonIcon aria-hidden="true" icon={flameOutline} />
            <IonLabel>Activity</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Listings" href="/listings">
            <IonIcon aria-hidden="true" icon={shirtOutline} />
            <IonLabel>Listings</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Insights" href="/insights">
            <IonIcon aria-hidden="true" icon={analytics} />
            <IonLabel>Insights</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
