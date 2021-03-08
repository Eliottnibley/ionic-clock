import React, { useState } from 'react'
import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonLabel, IonButton, IonList, IonItem, IonItemDivider, IonNote } from '@ionic/react'

const Stopwatch: React.FC = () => {

  const [tenths, setTenths] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [timeRunning, setTimeRunning] = useState<boolean>(false)
  const [laps, setLaps] = useState<number[]>([])
  const [minLap, setMinLap] = useState<number>(0)
  const [maxlap, setMaxLap] = useState<number>(0)

  const formatTime = (minutes: number, seconds: number, tenths: number) => {
    return `${minutes / 10 < 1 ? '0' + minutes : minutes}:${seconds / 10 < 1 ? '0' + seconds : seconds}.${tenths / 10 < 1 ? '0' + tenths : tenths}`
  }

  const formatLapTime = (miliSec: number) => {
    const min = Math.floor(miliSec / (60 * 1000))
    miliSec = miliSec % (60 * 1000)
    const sec = Math.floor(miliSec / 1000)
    miliSec = miliSec % 1000
    const tenth = Math.floor(miliSec / 10)

    return `${min / 10 < 1 ? '0' + min : min}:${sec / 10 < 1 ? '0' + sec : sec}.${tenth / 10 < 1 ? '0' + tenth : tenth}`
  }

  const calculateLap = () => {
    return laps.reduce((acc, cur) => acc + cur, 0)
  }

  const findMin = () => {
    let len = laps.length, min = laps[0], index = 0
    while(len--) {
      if(laps[len] < min) {
        min = laps[len]
        index = len
      }
    }
    return index
  }

  const findMax = () => {
    let len = laps.length, max = laps[0], index = 0
    while(len--) {
      if(laps[len] > max) {
        max = laps[len]
        index = len
      }
    }
    return index
  }

  const lapsMap = laps.map((elem, ind) => {
    let color
    if (laps.length >= 2) {
      color = ind == maxlap ? 'danger' : ind == minLap ? 'success' : 'dark'
    }
    else {
      color = 'dark'
    }
    return (
      <IonItem lines='full' key={ind + 1}>
        <IonLabel style={{'fontSize': '2vh'}} color={color} slot='start'>{`Lap ${ind + 1}`}</IonLabel>
        <IonNote style={{'fontSize': '2vh'}} color={color} slot='end'>{formatLapTime(elem)}</IonNote>
      </IonItem>
  )})

  if (timeRunning) {
    setTimeout(() => {
      setTime(time + 10);
      
  
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
                if (timeRunning) {
                  if (laps.length == 0) {
                    const newLaps = laps
                    newLaps.push(time)
                    setLaps(newLaps)
                  }
                  else {
                    let newLaps = laps
                    newLaps.push(time - calculateLap())
                    setLaps(newLaps)
                    setMinLap(findMin())
                    setMaxLap(findMax())
                    
                  }
                }
                else {
                  setTime(0)
                  setMinutes(0)
                  setSeconds(0)
                  setTenths(0)
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
      <IonList>
          {!timeRunning && time <= 0 ? '' :
          (<IonItem lines='full'>
            <IonLabel style={{'fontSize': '2vh'}} slot='start'>{`Lap ${laps.length + 1}`}</IonLabel>
            <IonNote style={{'fontSize': '2vh'}} slot='end'>{formatLapTime(time - calculateLap())}</IonNote>
          </IonItem>)}
          {lapsMap.reverse()}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Stopwatch