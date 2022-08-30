import { useState } from 'react'
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
  const [home, setHome] = useState('/img/icon/home.png')
  const [mypage, setMypage] = useState('/img/icon/mypage.png')
  const [camera, setCamera] = useState('/img/icon/camera.png')
  const [cameraLock, setCameraLock] = useState('/img/icon/camera-lock.png')
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '768px',
        height: '7%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderTop: '1px solid #E8E2E2',
      }}
    >
      <div
        onClick={() => {
          navigate('/home')
        }}
        onTouchStart={() => {
          setHome('/img/icon/home-click.png')
        }}
        onTouchEnd={() => {
          navigate('/home')
          setHome('/img/icon/home.png')
        }}
        style={{ height: '70%' }}
      >
        <img src={home} style={{ height: '100%' }} />
      </div>
      <div
        onClick={() => {
          navigate(`/mypage/${state.loginCheck.id}`)
        }}
        onTouchStart={() => {
          setMypage('/img/icon/mypage-click.png')
        }}
        onTouchEnd={() => {
          setMypage('/img/icon/mypage.png')
          navigate(`/mypage/${state.loginCheck.id}`)
        }}
        style={{ height: '70%' }}
      >
        <img src={mypage} style={{ height: '100%' }} />
      </div>
      {state.loginCheck.todayPhoto === 0 ? (
        <div
          onClick={() => {
            dispatch(onUploadSwitch())
            navigate('/upload')
          }}
          onTouchStart={() => {
            setCamera('/img/icon/camera-click.png')
          }}
          onTouchEnd={() => {
            setCamera('/img/icon/camera.png')
            dispatch(onUploadSwitch())
            navigate('/upload')
          }}
          style={{ height: '70%' }}
        >
          <img src={camera} style={{ height: '100%' }} />
        </div>
      ) : (
        <div
          onTouchStart={() => {
            setCameraLock('/img/icon/camera-lock-click.png')
          }}
          onTouchEnd={() => {
            setCameraLock('/img/icon/camera-lock.png')
          }}
          style={{ height: '70%' }}
        >
          <img src={cameraLock} style={{ height: '100%' }} />
        </div>
      )}
    </div>
    // <div
    //   style={{
    //     width: '100%',
    //     maxWidth: '768px',
    //     height: '7%',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderTop: '1px solid #E8E2E2',
    //   }}
    // >
    //   <div
    //     style={{
    //       width: '100%',
    //       display: 'flex',
    //       justifyContent: 'space-evenly',
    //       paddingTop: '5px',
    //     }}
    //   >
    //     <div style={{ width: '10%', maxWidth: '90px' }}>
    //       <div
    //         onClick={() => {
    //           navigate('/home')
    //         }}
    //         style={{
    //           paddingTop: '100%',
    //           background: 'url(/img/icon/home.png)',
    //           backgroundSize: 'contain',
    //           backgroundPosition: 'top center',
    //           backgroundRepeat: 'no-repeat',
    //         }}
    //       ></div>
    //     </div>
    //     <div style={{ width: '10%', maxWidth: '90px' }}>
    //       <div
    // onClick={() => {
    //   navigate(`/mypage/${state.loginCheck.id}`)
    // }}
    //         style={{
    //           paddingTop: '100%',
    //           background: 'url(/img/icon/mypage.png)',
    //           backgroundSize: 'contain',
    //           backgroundPosition: 'top center',
    //           backgroundRepeat: 'no-repeat',
    //         }}
    //       ></div>
    //     </div>
    //     <div style={{ width: '10%', maxWidth: '90px' }}>
    // {state.loginCheck.todayPhoto === 0 ? (
    //   <div
    // onClick={() => {
    //   dispatch(onUploadSwitch())
    //   navigate('/upload')
    // }}
    //     style={{
    //       paddingTop: '100%',
    //       background: 'url(/img/icon/camera.png)',
    //       backgroundSize: 'contain',
    //       backgroundPosition: 'top center',
    //       backgroundRepeat: 'no-repeat',
    //     }}
    //   ></div>
    // ) : (
    //   <div style={{ paddingTop: '100%', position: 'relative' }}>
    //     <img
    //       onClick={() => {
    //         navigate('/home')
    //       }}
    //       src="/img/icon/camera-lock.png"
    //       style={{
    //         position: 'fixed',
    //         width: 'inherit',
    //         height: 'inherit',
    //       }}
    //     />
    //   </div>
    //   // <div
    //   //   style={{
    //   //     paddingTop: '100%',
    //   //     background: 'url(/img/icon/camera-lock.png)',
    //   //     backgroundSize: 'contain',
    //   //     backgroundPosition: 'top center',
    //   //     backgroundRepeat: 'no-repeat',
    //   //   }}
    //   // ></div>
    // )}
    //     </div>
    //   </div>
    // </div>
  )
}
