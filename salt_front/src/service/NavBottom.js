import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { onUploadSwitch } from '../store/store'

export default function NavBottom({
  feedUploadModalSwitch,
  setFeedUploadModalSwitch,
}) {
  const state = useSelector((state) => {
    return state
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '768px',
        height: '14%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '1px solid #E8E2E2',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-evenly',
          paddingTop: '5px',
        }}
      >
        <div style={{ width: '20%', maxWidth: '90px' }}>
          <div
            onClick={() => {
              navigate('/home')
            }}
            style={{
              paddingTop: '100%',
              background: 'url(/img/home.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        </div>
        <div style={{ width: '20%', maxWidth: '90px' }}>
          <div
            onClick={() => {
              navigate(`/mypage/${state.loginCheck.id}`)
            }}
            style={{
              paddingTop: '100%',
              background: 'url(/img/mypage.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        </div>
        <div style={{ width: '20%', maxWidth: '100px' }}>
          {state.loginCheck.todayPhoto === 0 ? (
            <div
              onClick={() => {
                dispatch(onUploadSwitch())
                navigate('/upload')
              }}
              style={{
                paddingTop: '100%',
                background: 'url(/img/camera.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
          ) : (
            <div
              style={{
                paddingTop: '100%',
                background: 'url(/img/password.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  )
}
