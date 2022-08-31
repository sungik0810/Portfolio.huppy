import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import page from '../Page.module.css'
export default function ToHuppy() {
  const state = useSelector((state) => {
    return state
  })
  const navigate = useNavigate()
  function sendMessage(e) {
    e.preventDefault()
    const time = new Date()
    if (e.target[0].value !== '') {
      axios
        .post('/ToHuppy', {
          user: state.loginCheck,
          user_message: e.target[0].value,
          send_time: time,
        })
        .then((result) => {
          navigate('/home')
        })
    }
  }
  const [send, setSend] = useState('/img/button/inputsend.png')
  return (
    <div className={page.service_page}>
      <div
        style={{
          width: '100%',
          height: '100%',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form
          onSubmit={sendMessage}
          style={{
            width: '80%',
            height: '80%',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <textarea
            style={{ width: '100%', height: '50%', fontSize: '2rem' }}
          ></textarea>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '20%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',

                objectFit: 'contain',
              }}
              src={send}
            />
            <button
              onTouchStart={() => {
                setSend('/img/button/inputsend-1.png')
              }}
              onTouchEnd={() => {
                setSend('/img/button/inputsend.png')
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: '0',
              }}
              type="submit"
            >
              전송
            </button>
          </div>
          <img
            src="/img/title/help-notice.png"
            style={{ width: '100%', objectFit: 'contain' }}
          />
        </form>
      </div>
      <div></div>
    </div>
  )
}
