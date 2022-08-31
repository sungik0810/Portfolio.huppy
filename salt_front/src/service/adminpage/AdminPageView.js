import axios from 'axios'
import { useEffect, useState } from 'react'
import { LOCAL_HOST } from '../../App'

export default function AdminPageView() {
  const [userAll, setUsetAll] = useState([])
  useEffect(() => {
    axios.get('/admin/userAll').then((result) => {
      setUsetAll(result.data.userAll)
    })
  }, [])
  const [info, setInfo] = useState(false)
  const [mission, setMisson] = useState(false)
  const [missionState, setMissonState] = useState(false)
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex' }}>
        <button
          onClick={() => {
            setInfo(!info)
          }}
        >
          사용자 정보
        </button>
        <button
          onClick={() => {
            setMisson(!mission)
          }}
        >
          미션 입력 창
        </button>
      </div>
      <div
        style={
          info
            ? { display: 'flex', flexDirection: 'column' }
            : { display: 'none' }
        }
      >
        {userAll.map((user) => {
          return (
            <div
              style={{
                width: '100%',
                height: '20%',
                border: '1px solid black',
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
              }}
            >
              <label>
                고유아이디 :<>{user._id}</>
              </label>
              <label>
                유저아이디 :<>{user.id}</>
              </label>
              <label>
                유저닉네임 :<>{user.nickName}</>
              </label>
              <label>
                유저 프로필사진 :<>{user.profilePhoto}</>
                <div
                  style={{
                    overflow: 'hidden',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'grey',
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
                    }}
                  >
                    <img
                      style={{ height: '100%' }}
                      src={`${LOCAL_HOST}/profile/${user.profilePhoto}`}
                      alt="#"
                    />
                  </div>
                </div>
              </label>
              <label>
                유저 사진 여부 :
                <>{user.todayPhoto == 1 ? '오늘 사진 찍음' : '안찍음'}</>
              </label>
              <label>
                유저 계정 활성화 여부 :
                <>{user.activate ? 'active' : 'delete'}</>
              </label>
            </div>
          )
        })}
      </div>
      <div
        style={
          mission
            ? { display: 'flex', flexDirection: 'column' }
            : { display: 'none' }
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            axios.post('/admin/mission', { target: e.target[0].value })
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}
        >
          <input type="text" style={{ width: '100%', height: '300px' }}></input>
          <button type="submit">미션 입력</button>
        </form>
      </div>
    </div>
  )
}
