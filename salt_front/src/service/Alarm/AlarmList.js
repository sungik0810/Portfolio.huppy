import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LOCAL_HOST } from '../../App'

export default function AlarmList({ totalAlarm, alarmList, setAlarmList }) {
  const state = useSelector((state) => {
    return state
  })
  const navigate = useNavigate()
  const [isPostingComment, setPostingComment] = useState(false)
  function deleteLikeAlarm() {
    if (isPostingComment) {
      console.warn('already posting another comment')
      return
    }
    setPostingComment(true)
    axios
      .post('/alarm/like/delete', {
        user: state.loginCheck,
        target: totalAlarm,
      })
      .then((result) => {
        const total_alarmList = [
          ...result.data.like_alarm,
          ...result.data.comment_alarm,
        ]
        setAlarmList([...total_alarmList])
      })
      .catch((error) => {})
      .finally(() => setPostingComment(false))
  }
  function deleteCommentAlarm() {
    if (isPostingComment) {
      console.warn('already posting another comment')
      return
    }
    setPostingComment(true)
    axios
      .post('/alarm/comment/delete', {
        user: state.loginCheck,
        target: totalAlarm,
      })
      .then((result) => {
        const total_alarmList = [
          ...result.data.like_alarm,
          ...result.data.comment_alarm,
        ]
        setAlarmList([...total_alarmList])
      })
      .catch((error) => {})
      .finally(() => setPostingComment(false))
  }

  return totalAlarm.label == 'like' ? (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '10%',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          width: '30%',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            overflow: 'hidden',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            borderRadius: '60px',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '100%',
            }}
          >
            <img
              style={{ width: '50px', height: '50px', objectFit: 'contain' }}
              src={`${LOCAL_HOST}/profile/${totalAlarm.user_profile}`}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          width: '70%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {' '}
        <div style={{ width: '100%' }}>
          <p style={{ height: '0px' }}>{totalAlarm.user_nickName}님이</p>
          <p>좋아요를 눌렀습니다!</p>
        </div>
      </div>
      <div
        style={{
          width: '30px',
          height: '30px',
          background: 'red',
        }}
        onClick={deleteLikeAlarm}
      ></div>
    </div>
  ) : (
    totalAlarm.label == 'comment' && (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '10%',
        }}
      >
        <div
          style={{
            width: '30%',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              overflow: 'hidden',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              borderRadius: '50%',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
              }}
            >
              <img
                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                src={`${LOCAL_HOST}/profile/${totalAlarm.user_profile}`}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            width: '70%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {' '}
          <div style={{ width: '100%' }}>
            <p style={{ height: '0px' }}>{totalAlarm.user_nickName}님이</p>
            <p>댓글을 남겼습니다!</p>
          </div>
        </div>
        <div
          style={{
            width: '30px',
            height: '30px',
            background: 'red',
          }}
          onClick={deleteLikeAlarm}
        ></div>
      </div>
    )
  )
}
