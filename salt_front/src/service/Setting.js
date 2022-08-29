import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import page from './Page.module.css'
export default function Setting() {
  const state = useSelector((state) => {
    return state
  })
  const navigate = useNavigate()
  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className={page.service_page}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <div
          onClick={() => {
            navigate('/ToHuppy')
          }}
          style={{
            width: '77%',
            height: '9.8%',
            background: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '3px solid #FAD8CD',
            borderRadius: '30px',
          }}
        >
          문의
        </div>
        <div
          onClick={logout}
          style={{
            width: '77%',
            height: '9.8%',
            background: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '3px solid #FAD8CD',
            borderRadius: '30px',
          }}
        >
          로그아웃
        </div>
        <div
          onClick={() => {
            navigate('/user/remove')
          }}
          style={{
            width: '77%',
            height: '9.8%',
            background: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '3px solid #FAD8CD',
            borderRadius: '30px',
          }}
        >
          회원 탈퇴
        </div>
        {state.adminCheck.admin ? (
          <div
            onClick={() => {
              navigate('/admin')
            }}
          >
            관리자 페이지
          </div>
        ) : null}
      </div>
    </div>
  )
}
