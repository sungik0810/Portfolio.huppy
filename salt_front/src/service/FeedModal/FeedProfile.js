import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LOCAL_HOST } from '../../App.js'

export default function FeedProfile() {
  const state = useSelector((state) => {
    return state
  })

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '15%',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          overflow: 'hidden',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'grey',
          borderRadius: '50%',
          marginLeft: '20px',
          marginRight: '20px',
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
            src={`${LOCAL_HOST}/profile/${state.photoClick.data.userProfile}`}
            alt="#"
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div>{state.photoClick.data.nickName}</div>
        <div>
          {state.photoClick.data.time.split(
            state.photoClick.data.time.substr(0, 10)
          )}
        </div>
      </div>
    </div>
  )
}
