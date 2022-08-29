import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Main.module.css'
import page from './Page.module.css'
export default function Register() {
  const navigate = useNavigate()
  const [registerMSG, setRegisterMSG] = useState('')
  const registerBtn = (e) => {
    e.preventDefault()
    const registerData = {
      id: e.target[0].value,
      nickName: e.target[1].value,
      pw: e.target[2].value,
      pwCheck: e.target[3].value,
    }
    axios
      .post('/registerAPI', registerData)
      .then(function (result) {
        setRegisterMSG(result.data.registerMSG)
      })
      .catch(function (error) {
        console.log(error + 'error!')
      })
  }
  return (
    <div className={page.main_service_page}>
      {registerMSG === '가입성공' && (
        <div
          onClick={() => {
            navigate('/login')
            setRegisterMSG('')
          }}
          style={{
            width: '100%',
            maxWidth: '1024px',
            position: 'absolute',
            height: '100%',
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '3',
          }}
        >
          <div
            style={{
              width: '80%',
              height: '10%',
              background: 'blue',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '20px',
            }}
          >
            {registerMSG}
          </div>
        </div>
      )}
      <div className={` ${styles.login_layout} ${styles.login_layout_top}`}>
        <div></div>
        <div
          className={` ${styles.login_layout_center}`}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <img
            className={`${styles.login_logo}`}
            src="img/login_icon.png"
            alt="img/login_icon.png"
          />
        </div>
        <div></div>
      </div>
      <div className={` ${styles.login_layout} ${styles.login_layout_bottom}`}>
        <div></div>
        <div className={` ${styles.login_layout_center}`}>
          <form
            onSubmit={registerBtn}
            style={{
              height: '86%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '279px',
                display: 'flex',
                flexDirection: 'column',
                height: '81%',

                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '273px',
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                >
                  <input
                    className={styles.register_input}
                    type="text"
                    name="registerId"
                    autoComplete="username"
                    placeholder="ID를 입력해주세요"
                  />
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      fontSize: '12px',
                      color: 'red',
                    }}
                  >
                    {registerMSG === '사용 중인 ID입니다' && registerMSG}
                  </div>
                </label>
                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                >
                  <input
                    className={styles.register_input}
                    type="text"
                    name="registerNickName"
                    autoComplete="nickname"
                    placeholder="사용할 닉네임을 입력해주세요"
                  />
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      fontSize: '12px',
                      color: 'red',
                    }}
                  >
                    {registerMSG === '사용 중인 닉네임입니다' && registerMSG}
                  </div>
                </label>
                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                >
                  <input
                    className={styles.register_input}
                    type="password"
                    name="registerPw"
                    autoComplete="new-password"
                    placeholder="비밀번호를 입력해주세요"
                  />
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      fontSize: '12px',
                      color: 'red',
                    }}
                  >
                    {registerMSG === '비밀번호를 다시 확인해주세요' &&
                      registerMSG}
                  </div>
                </label>
                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                >
                  <input
                    className={styles.register_input}
                    type="password"
                    name="registerPwCheck"
                    autoComplete="new-password"
                    placeholder="비밀번호를 확인해주세요"
                  />
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      fontSize: '12px',
                      color: 'red',
                    }}
                  >
                    {registerMSG === '비밀번호를 다시 확인해주세요' &&
                      registerMSG}
                  </div>
                </label>
              </div>
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <button className={styles.login_btn} type="submit">
                회원가입
              </button>
              <div
                onClick={() => {
                  navigate('/login')
                }}
              >
                뒤로가기
              </div>
            </div>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  )
}
