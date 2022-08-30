import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import page from '../Page.module.css'
import AlarmList from './AlarmList'
export default function Alarm() {
  const state = useSelector((state) => {
    return state
  })
  const [alarmList, setAlarmList] = useState([])
  useEffect(() => {
    axios
      .get(`/alarm/get/${state.loginCheck.id}`)
      .then((result) => {
        const total_alarmList = [
          ...result.data.like_alarm,
          ...result.data.comment_alarm,
        ]
        setAlarmList([...total_alarmList])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <div className={page.service_page} style={{}}>
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <img style={{ width: '8%' }} src="/img/title/top.png" />
      </div>
      {/* 알람리스트 */}
      {alarmList.length > 0 ? (
        alarmList.map((totalAlarm) => {
          return (
            <AlarmList
              totalAlarm={totalAlarm}
              alarmList={alarmList}
              setAlarmList={setAlarmList}
            />
          )
        })
      ) : (
        <div>알림이 없습니다</div>
      )}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <img style={{ width: '8%' }} src="/img/title/bottom.png" />
      </div>
    </div>
  )
}
