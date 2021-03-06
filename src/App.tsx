import React from 'react';
import { Route } from 'react-router-dom'
import { IonApp, IonButton, IonContent, IonHeader, IonIcon, IonNav, IonTabBar, IonTabButton, IonTabs, IonBadge, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router'
import { alarm, stopwatch, timer } from 'ionicons/icons';

// Imports for other Components


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

/* Theme variables */
import './theme/variables.css';
import Alarms from './components/Alarms';
import Timer from './components/Timer';
import Stopwatch from './components/Stopwatch';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path='alarms' component={Alarms}></Route>
          <Route path='timer' component={Timer}></Route>
          <Route path='stopwatch' component={Stopwatch}></Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="alarms">
            <IonIcon icon={alarm} />
            <IonLabel>Alarm</IonLabel>
          </IonTabButton>

          <IonTabButton tab="stopwatch">
            <IonIcon icon={stopwatch} />
            <IonLabel>Stopwatch</IonLabel>
          </IonTabButton>

          <IonTabButton tab="timer">
            <IonIcon icon={timer} />
            <IonLabel>Timer</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
