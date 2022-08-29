import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LOCAL_HOST } from '../App'

export default function NavTop() {
  const navigate = useNavigate()
  let state = useSelector((state) => {
    return state
  })

  return (
    <div
      style={{
        width: '100%',
        height: '13.5%',
        maxWidth: '768px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end',
        borderBottom: '1px solid #E8E2E2',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '77%',

          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            minWidth: '55%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {
            window.location.pathname === `/mypage/${state.loginCheck.id}` ? (
              <div
                style={{
                  minWidth: '190px',
                  width: '79%',
                  maxWidth: '200px',
                  height: '58%',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',

                  // marginRight: '10%',
                }}
              >
                <div
                  style={{
                    overflow: 'hidden',
                    minWidth: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'grey',
                    borderRadius: '50%',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      style={{ height: '100%' }}
                      src={`${LOCAL_HOST}/profile/${state.loginCheck.profile}`}
                    />
                  </div>
                </div>
                <div style={{ paddingLeft: '8px' }}>
                  <div style={{ fontSize: '24px' }}>
                    {state.loginCheck.nickName}
                  </div>
                  <div
                    onClick={() => {
                      navigate(`/mypage/${state.loginCheck.id}/profile`)
                    }}
                    style={{ fontSize: '12px' }}
                  >
                    내 프로필 편집하기
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  minWidth: '190px',
                  width: '79%',
                  maxWidth: '200px',
                  height: '58%',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',

                  // marginRight: '10%',
                }}
              >
                <img
                  onClick={() => {
                    navigate('/home')
                  }}
                  src="/img/Logo_2.png"
                  style={{ width: '69%' }}
                />
              </div>
            )
            // (
            // <img
            //   onClick={() => {
            //     navigate("/home");
            //   }}
            //   src="/img/Logo_2.png"
            //   style={{ width: "69%" }}
            // />
            // )
          }
        </div>
        <div
          style={{
            width: '35%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '62%',
              height: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <img
              onClick={() => {
                navigate(`/mypage/${state.loginCheck.id}/alarm`)
              }}
              src="img/alarm.png"
              style={{ width: '39%' }}
            />
            <img
              onClick={() => {
                navigate('/setting')
              }}
              src="img/setting.png"
              style={{ width: '39%' }}
              alt="#"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
