import React, { useState } from 'react'
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonModal, IonPage, IonRow, IonItem, IonSelect, IonSelectOption, IonDatetime, IonList, IonToggle } from '@ionic/react'
import { toggle } from 'ionicons/icons'
import SingleAlarm from './SingleAlarm'


const Alarms: React.FC = () => {
  const [alarmsList, setAlarmsList] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [time, setTime] = useState<string>(new Date().toString())

  const alarmsMap = alarmsList.map((elem, ind) => {
    return (
      <SingleAlarm elem={elem}></SingleAlarm>
    )
  })

  console.log(alarmsList)
  return (
    <IonPage>
      <IonHeader >
        <IonGrid>
          <IonRow>
            <IonCol size='2'>
              <IonButton fill='clear' expand='block' color='primary'>Edit</IonButton>
            </IonCol>
            <IonCol size='3' offset='7'>
              <IonButton fill='clear' expand='block' color='primary' onClick={() => setModalOpen(true)}>Add New</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>
      <IonContent>
        <IonList>
          {alarmsMap}
        </IonList>
        <IonModal isOpen={modalOpen}>
          <IonHeader>
            <IonGrid>
              <IonRow>
                <IonCol size='3'>
                  <IonButton 
                  fill='clear' 
                  expand='block' 
                  color='primary' 
                  onClick={() => {
                    setModalOpen(false)
                  }}
                  >Cancel</IonButton>
                </IonCol>
                <IonCol size='3' offset='6'>
                  <IonButton 
                  fill='clear' 
                  expand='block' 
                  color='primary' 
                  onClick={() => {
                    setModalOpen(false)
                    let newAlarms = alarmsList
                    newAlarms.push(time)
                    setAlarmsList(newAlarms)
                  }}
                  >Save</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonLabel>Pick Time</IonLabel>
              <IonDatetime displayFormat='h:mm A' value={time} onIonChange={e => setTime(e.detail.value!)}></IonDatetime>
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent> 
    </IonPage>
  )
}

export default Alarms