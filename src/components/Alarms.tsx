import React, { useState } from 'react'
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonModal, IonPage, IonRow, IonItem, IonSelect, IonSelectOption, IonDatetime, IonList, IonToggle, IonToast } from '@ionic/react'
import { toggle } from 'ionicons/icons'
import { forceUpdate } from 'ionicons/dist/types/stencil-public-runtime'


const Alarms: React.FC = () => {
  const [alarmsList, setAlarmsList] = useState<string[]>(['Mon Mar 08 2021 7:00:44', 'Mon Mar 08 2021 11:00:44', 'Mon Mar 08 2021 17:30:44'])
  const [intervalList, setIntervalList] = useState<NodeJS.Timer[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [time, setTime] = useState<string>(new Date().toString())
  const [editable, setEditable] = useState<boolean>(false)
  const [toastOpen, setToastOpen] = useState<boolean>(false)

  const alarmsMap = alarmsList.map((elem, ind) => {
    const turnOnAlarm = () => {
      let newIntervalList = intervalList
      const interval = (setInterval(() => {
        const alarmTime = new Date(elem)
        const currTime = new Date()

        if (alarmTime.getHours() == currTime.getHours() && alarmTime.getMinutes() == currTime.getMinutes()) {
          setToastOpen(true)
          clearInterval(interval)
        }
      }, 1000))
      newIntervalList[ind] = interval
      setIntervalList(newIntervalList)
    }
    
    return (
      <IonItem lines='full' key={ind}>
        {!editable ? '' : (
          <IonButton color='danger' slot='start' onClick={() => {
            let newList = alarmsList
            newList.splice(ind, 1)
            setAlarmsList(newList)
          }}
          >Delete</IonButton>
        )}
        <IonDatetime 
        readonly={!editable} 
        displayFormat='h:mm a' 
        value={elem} 
        onIonChange={(e) => {
          let newList = alarmsList
          newList[ind] = e.detail.value!
          setAlarmsList(newList)
        }}
        ></IonDatetime>
        <IonToggle id='alarm-toggle' checked={editable} slot='end' onIonChange={(e) => {
          if (e.detail.checked) {
            turnOnAlarm()
          }
          else {
            clearInterval(intervalList[ind])
          }
        }}></IonToggle>
      </IonItem>
    )
  })

  return (
    <IonPage>
      <IonHeader style={{'borderBottom': '1px solid #92949c'}} >
        <IonGrid>
          <IonRow>
            <IonCol size='2'>
              <IonButton fill='clear' expand='block' color='primary' onClick={() => {
                setEditable(!editable)
                intervalList.forEach(elem => clearInterval(elem))
                }}
                >{editable ? 'Save' : 'Edit'}</IonButton>
            </IonCol>
            <IonCol size='3' offset='7'>
              <IonButton disabled={editable} fill='clear' expand='block' color='primary' onClick={() => setModalOpen(true)}>Add New</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>
      <IonContent>
        <IonToast 
        message='Alarm!'
        isOpen={toastOpen}
        position='top'
        duration={3000}
        color='secondary'
        onDidDismiss={() => setToastOpen(false)}
        ></IonToast>
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
                    let newAlarmList = alarmsList
                    newAlarmList.push(time)
                    setAlarmsList(newAlarmList)
                    setModalOpen(false)
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