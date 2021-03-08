import React, { useState } from 'react'
import { IonItem, IonDatetime, IonToggle } from '@ionic/react'

const SingleAlarm: React.FC = (props) => {
  const [realTime, setRealTime] = useState<string>();

  if ()

  return (
    <IonItem lines='full' key={ind}>
        <IonDatetime displayFormat='h:mm a' value={elem}></IonDatetime>
        <IonToggle slot='end'></IonToggle>
      </IonItem>
  )
}

export default SingleAlarm