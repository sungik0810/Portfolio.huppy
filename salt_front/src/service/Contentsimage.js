import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LOCAL_HOST } from '../App'
import { onPhotoClick } from '../store/store'

export default function ContentsImage({ photo }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div
      onClick={(e) => {
        dispatch(onPhotoClick(photo))
        navigate('/content')
      }}
      style={{
        width: `${100 / 3}%`,
        maxWidth: '256px',
        background: 'white',
        border: '2px solid white',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          paddingBottom: '100%',
          background: `url(${LOCAL_HOST}/userimage/${photo.filename})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></div>
    </div>
  )
}
