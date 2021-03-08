import React, { useEffect, useState } from 'react'
import { IonButton, IonCol, IonContent, IonDatetime, IonGrid, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption } from '@ionic/react'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { NativeAudio } from '@ionic-native/native-audio'
import './Timer.css'

const Timer: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0)
  const [totalSeconds, setTotalSeconds] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [timerExists, setTimerExists] = useState<boolean>(false)
  const [timerRunning, setTimerRunning] = useState<boolean>(false)
  let NativeAudio

  let interval;

  if (secondsLeft <= 0 && timerRunning) {
    setTimerRunning(false)
    setTimerExists(false)

    // this is where we can play a sound for the timer.
  }
  else if (timerRunning) {
    interval = setTimeout(() => {
      setSecondsLeft(secondsLeft - 100)
      let time = Math.floor(secondsLeft / 1000)

      setHours(Math.floor(time / (60 * 60)))
      time = time % (60 * 60)
      setMinutes(Math.floor(time / 60))
      time = time % 60
      setSeconds(Math.floor(time))

    }, 100)

  }
  else {
    clearTimeout(interval)
  }

  let hrsArray = [] 
  for (let i = 0; i < 24; i++) {
    hrsArray[i] = i
  }
  const hrsMap = hrsArray.map((elem) => (
    <IonSelectOption key={elem} value={elem}>{elem}</IonSelectOption>
  ))

  let minArray = [] 
  for (let i = 0; i < 60; i++) {
    minArray[i] = i
  }
  const minMap = minArray.map((elem) => (
    <IonSelectOption key={elem} value={elem}>{elem}</IonSelectOption>
  ))

  let secArray = [] 
  for (let i = 0; i < 60; i++) {
    secArray[i] = i
  }
  const secMap = secArray.map((elem) => (
    <IonSelectOption key={elem} value={elem}>{elem}</IonSelectOption>
  ))

  const formatTime = () => {
    return `${hours / 10 < 1 ? '0' + hours : hours}:${minutes / 10 < 1 ? '0' + minutes : minutes}:${seconds / 10 < 1 ? '0' + seconds : seconds}`
  }


  return (
    <IonPage>
      <IonContent>
        <IonRow></IonRow>
        <IonRow>
          <IonCol style={{'--ion-grid-column-padding': '5%', 'paddingTop': '50px'}}>
            <CircularProgressbarWithChildren counterClockwise={true} value={100 * (secondsLeft / totalSeconds)}>
              {timerExists ? <IonLabel style={{'fontSize': '15vw'}}>{formatTime()}</IonLabel> :
                <IonList style={{'width': '50%'}}>
                <IonItem>
                  <IonLabel>hrs</IonLabel>
                  <IonSelect disabled={timerExists} value={hours} onIonChange={e => setHours(e.detail.value)}>
                    {hrsMap}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel>min</IonLabel>
                  <IonSelect disabled={timerExists} value={minutes} onIonChange={e => setMinutes(e.detail.value)}>
                    {minMap}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel>sec</IonLabel>
                  <IonSelect disabled={timerExists} value={seconds} onIonChange={e => setSeconds(e.detail.value)}>
                    {secMap}
                  </IonSelect>
                </IonItem>
              </IonList>}
            </CircularProgressbarWithChildren>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton
            color={timerExists ? 'warning' : 'primary'}
            disabled={timerRunning}
            size='large' 
            expand='block' 
            onClick={e => {
              setTimerRunning(false)
              setTimerExists(false)
              setSecondsLeft(1)
              setTotalSeconds(1)
              setHours(0)
              setMinutes(0)
              setSeconds(0)
            }}
            >Clear</IonButton>
          </IonCol>
          <IonCol>
            <IonButton 
            color={timerExists && timerRunning ? 'primary' : timerExists ? 'secondary' : 'primary'}
            size='large' 
            expand='block'
            onClick={e => {
              setTimerRunning(!timerRunning)
              if (!timerRunning && !timerExists) {
                setTotalSeconds(1000 * (hours * 3600 + minutes * 60 + seconds))
                setSecondsLeft(1000 * (hours * 3600 + minutes * 60 + seconds))
                setTimerExists(true)
              }
            }}
            >{timerExists && timerRunning ? 'Pause' : timerExists ? 'Resume' : 'Start'}</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  )
}

export default Timer