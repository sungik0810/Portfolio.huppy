import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AdminPage() {
  const navigate = useNavigate()
  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            axios
              .post('/admin/login', {
                admin_id: e.target[0].value,
                admin_pw: e.target[1].value,
              })
              .then((result) => {
                navigate('/admin/view')
              })
          }}
        >
          <input type="text"></input>
          <input type="password"></input>
          <button type="submit"></button>
        </form>
      </div>
      <div></div>
    </div>
  )
}
