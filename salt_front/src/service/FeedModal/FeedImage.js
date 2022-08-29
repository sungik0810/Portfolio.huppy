import { useSelector } from 'react-redux'
import { LOCAL_HOST } from '../../App.js'

export default function FeedImage() {
  const state = useSelector((state) => {
    return state
  })
  return (
    <div
      style={{
        width: '100%',
        background: 'white',
        borderTop: '3px solid #FAD8CD',
        borderBottom: '3px solid #FAD8CD',
      }}
    >
      <div
        style={{
          width: '100%',
          paddingBottom: '100%',
          background: `url(${LOCAL_HOST}/userimage/${state.photoClick.data.filename})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
    </div>
  )
}
