import axios from 'axios'
import { useSelector } from 'react-redux'
import page from '../Page.module.css'
export default function ToHuppy() {
  const state = useSelector((state) => {
    return state
  })
  function sendMessage(e) {
    e.preventDefault()
    const time = new Date()
    console.log(time)
    axios
      .post('/ToHuppy', {
        user: state.loginCheck,
        user_message: e.target[0].value,
        send_time: time,
      })
      .then((result) => {
        console.log(result)
      })
  }
  return (
    <div className={page.service_page}>
      <div>
        <form onSubmit={sendMessage}>
          <input></input>
          <button type="submit">전송</button>
        </form>
      </div>
      <div></div>
    </div>
  )
}
