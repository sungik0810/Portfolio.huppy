import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { adminChecker, loginCheckOk } from '../store/store'
import styles from './Main.module.css'
import { useEffect, useState } from 'react'
import page from './Page.module.css'
export default function Login() {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const [loginErrorMSG, setLoginErrorMSG] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoginErrorMSG('')
    axios
      .post('/login', { id: e.target[0].value, pw: e.target[1].value })
      .then(function (result) {
        if (result.data.ok) {
          if (result.data.user.admin) {
            dispatch(adminChecker(result.data.user.admin))
          }
          localStorage.setItem('token', result.data.token)
          dispatch(loginCheckOk(result.data))
          navigate('/home')
        } else {
          setLoginErrorMSG(result.data)
        }
      })
  }
  const [loginBtn, setLoginBtn] = useState('img/button/inputlogin-before.png')
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  useEffect(() => {
    captureEvent()
  }, [deferredPrompt])
  const captureEvent = () => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      console.log(deferredPrompt)
    })
  }

  const clickCallback = () => {
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        // $gtag.event('add_to_home_screen')
      }
      setDeferredPrompt(null)
    })
  }
  return (
    <div className={page.main_service_page}>
      {deferredPrompt ? (
        <button
          style={{ width: '20%', height: '30%' }}
          onClick={clickCallback}
        ></button>
      ) : null}
      <button
        style={{ width: '20%', height: '30%' }}
        onClick={clickCallback}
      ></button>
      <div className={` ${styles.login_layout} ${styles.login_layout_top}`}>
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
          />
        </div>
        <div></div>
      </div>
      <div className={` ${styles.login_layout} ${styles.login_layout_bottom}`}>
        <div></div>
        <div className={` ${styles.login_layout_center}`}>
          <div style={{ height: '44%' }}>
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                minHeight: '258px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '65%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    maxWidth: '292px',
                    height: '30px',
                    color: 'red',
                  }}
                >
                  {loginErrorMSG}
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '63%',
                    minHeight: '105px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <input
                    className={styles.login_input}
                    type="text"
                    name="id"
                    autoComplete="off"
                    placeholder="ID"
                  />
                  <input
                    className={styles.login_input}
                    type="password"
                    name="pw"
                    autoComplete="off"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '35%',
                  minHeight: '91px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    className={styles.login_input}
                    onTouchStart={() => {
                      setLoginBtn('img/button/inputlogin.png')
                    }}
                    onTouchEnd={() => {
                      setLoginBtn('img/button/inputlogin-before.png')
                    }}
                    style={{
                      position: 'relative',
                      border: '0px',
                      boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
                    }}
                  >
                    <img
                      src={loginBtn}
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
                </div>
                <div
                  style={{
                    borderTop: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '10px',
                    fontFamily: 'Abel',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '13px',
                  }}
                >
                  <div
                    style={{ paddingLeft: '5px' }}
                    type="button"
                    onClick={() => {
                      navigate('/register')
                    }}
                  >
                    회원가입
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div></div>
        </div>
        <div></div>
      </div>
    </div>
  )
}
