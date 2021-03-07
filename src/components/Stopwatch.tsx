import React, { useState } from 'react'
import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonLabel, IonButton } from '@ionic/react'

const Stopwatch: React.FC = () => {
  const [tenths, setTenths] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [timeRunning, setTimeRunning] = useState<boolean>(false)
  const [laps, setLaps] = useState<number[]>([])
  const [lapTime, setLapTime] = useState<number>(0)

  const formatTime = (minutes: number, seconds: number, tenths: number) => {
    return `${minutes / 10 < 1 ? '0' + minutes : minutes}:${seconds / 10 < 1 ? '0' + seconds : seconds}.${tenths / 10 < 1 ? '0' + tenths : tenths}`
  }

  if (timeRunning) {
    setTimeout(() => {
      setTime(time + 10);
      setLapTime(lapTime + 10)
  
      let formated = time
      setMinutes(Math.floor(formated / (60 * 1000)))
      formated = formated % (60 * 1000)
      setSeconds(Math.floor(formated / 1000))
      formated = formated % 1000
      setTenths(Math.floor(formated / 10))
    }, 10)
  }

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol style={{'--ion-grid-column-padding': '10%', 'paddingTop': '100px'}}>
              <IonLabel style={{'fontSize': '20vw'}}>{formatTime(minutes, seconds, tenths)}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='4'>
              <IonButton 
              onClick={() => {
                console.log(laps)
                if (timeRunning) {
                  if (laps.length == 0) {
                    let newLaps = [lapTime]
                    setLaps(newLaps)
                    setLapTime(0)
                  }
                  else {
                    let newLaps = laps
                    newLaps[laps.length] = lapTime
                    setLaps(newLaps)
                    setLapTime(0)
                  }
                }
                else {
                  setTime(0)
                  setMinutes(0)
                  setSeconds(0)
                  setTenths(0)
                  setLapTime(0)
                  setLaps([])
                }
              }}
              expand='block'
              >{timeRunning ? 'Lap' : 'Reset'}</IonButton>
            </IonCol>
            <IonCol offset='4' size='4'>
              <IonButton
              color={timeRunning ? 'danger' : 'success'}
              onClick={() => {
                setTimeRunning(!timeRunning)
              }}
              expand='block'
              >{timeRunning ? 'Stop' : 'Start'}</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonContent>

      </IonContent>
    </IonPage>
  )
}

export default Stopwatch