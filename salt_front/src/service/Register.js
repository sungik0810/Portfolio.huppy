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
    axios.post('/registerAPI', registerData).then(function (result) {
      navigate('/')
      setRegisterMSG(result.data.registerMSG)
    })
  }
  const [loginBtn, setLoginBtn] = useState('img/button/Register-before.png')
  return (
    <div className={page.main_service_page}>
      {registerMSG === '가입성공' && (
        <div
          onClick={() => {
            navigate('/')
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
              height: '20%',
              // background: 'blue',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '20px',
            }}
          >
            <img
              src="img/icon/register-success.png"
              style={{ height: '100%' }}
            />
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
            src="img/icon/logo-icon.png"
            alt="img/icon/logo-icon.png"
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
              overflow: 'scroll',
              minHeight: '273px',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '279px',
                display: 'flex',
                flexDirection: 'column',
                height: '81%',
                minHeight: '273px',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '273px',
                  overflow: 'scroll',
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
                    minlength="6"
                    maxlength="12"
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
                    minlength="6"
                    maxlength="12"
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
                    minlength="8"
                    className={styles.register_input}
                    type="password"
                    name="registerPw"
                    autoComplete="new-password"
                    placeholder="비밀번호를 8자 이상 입력해주세요"
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
                    minlength="8"
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
              <div
                className={styles.login_input}
                onTouchStart={() => {
                  setLoginBtn('img/button/Register-after.png')
                }}
                onTouchEnd={() => {
                  setLoginBtn('img/button/Register-before.png')
                }}
                style={{
                  position: 'relative',
                  border: '0px',
                  boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
                }}
              >
                <img
                  src={loginBtn}
                  type="submit"
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    width: '100%',
                  }}
                />
                <button
                  style={{
                    opacity: '0',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                  }}
                  type="submit"
                ></button>
              </div>
              <div
                onClick={() => {
                  navigate('/')
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
