import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import page from '../Page.module.css'

export default function UserRemove() {
  const state = useSelector((state) => {
    return state
  })
  const navigate = useNavigate()
  return (
    <div className={page.service_page}>
      <div>정말 삭제 하시겠습니까?</div>
      <form
        onSubmit={(e) => {
          axios
            .post('/user/remove', {
              user: state.loginCheck,
            })
            .then((result) => {
              localStorage.removeItem('token')
              navigate('/login')
            })
        }}
      >
        <button type="submit">예</button>
      </form>
    </div>
  )
}
