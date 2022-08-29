import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  changeLikeArray,
  offPhotoClick,
  peoplePhotoLike,
  personPhotoLike,
} from '../../store/store.js'

export default function Like() {
  const state = useSelector((state) => {
    return state
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isPostingComment, setPostingComment] = useState(false)
  const like = () => {
    if (state.loginCheck.id !== '') {
      if (isPostingComment) {
        console.warn('already posting another comment')
        return
      }
      setPostingComment(true)
      axios
        .post('/like', {
          user: state.loginCheck,
          postNum: state.photoClick.data._id,
        })
        .then((result) => {
          const newLikeArray = [...result.data.like]
          dispatch(changeLikeArray(newLikeArray))
          dispatch(peoplePhotoLike(result.data))
          dispatch(personPhotoLike(result.data))
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => setPostingComment(false))
    } else {
      console.log('로그인이 필요합니다')
      navigate('/login')
    }
  }

  return (
    <div
      style={{
        width: '100%',
        height: '5%',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          onClick={like}
          style={{ width: '20px', height: '20px', background: 'red' }}
        ></div>
        좋아요{state.photoClick.data.like.length}
      </div>
      {state.photoClick.data.id === state.loginCheck.id && (
        <div
          onClick={() => {
            axios
              .delete(`/content/delete/${state.photoClick.data._id}`, {
                data: { data_full: state.photoClick.data },
              })
              .then((result) => {
                console.log('삭제성공')
                dispatch(offPhotoClick())
                navigate('/home')
              })
          }}
        >
          삭제
        </div>
      )}
      <div
        onClick={() => {
          dispatch(offPhotoClick())
          navigate('/home')
        }}
      >
        닫기
      </div>
    </div>
  )
}
