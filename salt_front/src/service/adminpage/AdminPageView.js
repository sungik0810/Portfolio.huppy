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

  return (
    <div>
      <div>사용자 정보</div>
      <div>
        {userAll.map((user) => {
          return (
            <div
              style={{
                border: '1px solid black',
                display: 'flex',
                padding: '10px',
              }}
            >
              <label>
                고유아이디
                <>{user._id}</>
              </label>
              <label>
                유저아이디
                <>{user.id}</>
              </label>
              <label>
                유저닉네임
                <>{user.nickName}</>
              </label>
              <label>
                유저 프로필사진
                <>{user.profilePhoto}</>
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
                유저 사진 여부
                <>{user.todayPhoto == 1 ? '오늘 사진 찍음' : '아직 안찍음'}</>
              </label>
              <label>
                유저 계정 활성화 여부
                <>{user.activate ? '계정 활동' : '계정 삭제'}</>
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
