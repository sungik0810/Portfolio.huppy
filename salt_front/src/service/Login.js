import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginCheckOk } from '../store/store'
import styles from './Main.module.css'
import { useState } from 'react'
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
          localStorage.setItem('token', result.data.token)
          dispatch(loginCheckOk(result.data))
          navigate('/home')
        } else {
          setLoginErrorMSG(result.data)
        }
      })
      .catch(function (error) {
        console.log(error + 'error!')
      })
  }

  return (
    <div className={page.main_service_page}>
      <div className={` ${styles.login_layout} ${styles.login_layout_top}`}>
        <div
          className={` ${styles.login_layout_center}`}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <img className={`${styles.login_logo}`} src="img/login_logo.png" />
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
                <button className={styles.login_btn} type="submit">
                  Login
                </button>
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
                    style={{ paddingRight: '5px' }}
                    type="button"
                    onClick={() => {
                      navigate('/register')
                    }}
                  >
                    아이디찾기
                  </div>
                  <div
                    style={{
                      borderLeft: '1px solid black',
                      borderRight: '1px solid black',
                      padding: '0px 5px',
                    }}
                    type="button"
                    onClick={() => {
                      navigate('/home')
                    }}
                  >
                    비밀번호찾기
                  </div>
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
