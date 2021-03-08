import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonText, IonTitle } from '@ionic/react'
import React from 'react'

const Landing: React.FC = () => {
  return (
    <IonPage>
      <IonContent style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'}}>
        <IonText style={{'fontSize': '4vw', 'display': 'flex', 'justifyContent': 'center', 'textAlign':'center', 'paddingTop':'20vh'}} color='primary'><h1>Welcome to Ionic Clock</h1></IonText>
      </IonContent>
      <IonContent style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'}}>
        <IonText color='' style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'textAlign':'center'}}>The app features custom alarms, convinient stopwatch, and easy an easy to use timer. Use the tabs at the bottom to explore!</IonText>
      </IonContent>
      <IonContent style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'textAlign':'center'}}>
        <IonText>For the best expirience, view page in mobile device view.</IonText>
      </IonContent>
    </IonPage>
  )
}

export default Landing