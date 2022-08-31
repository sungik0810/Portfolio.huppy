import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Comment() {
  const state = useSelector((state) => {
    return state
  })
  const navigate = useNavigate()
  const [commentList, setCommentList] = useState([])
  const [isPostingComment, setPostingComment] = useState(false)

  const postComment = (e) => {
    e.preventDefault()
    if (isPostingComment) {
      console.warn('already posting another comment')
      return
    }
    setPostingComment(true)
    axios
      .post('/comment/upload', {
        post: state.photoClick.data,
        id: state.loginCheck.id,
        nickName: state.loginCheck.nickName,
        profile: state.loginCheck.profile,
        comment: e.target[0].value,
      })
      .then((result) => {
        setCommentList(result.data)
      })
      .finally(() => setPostingComment(false))
  }

  useEffect(() => {
    axios.get(`/comment/read/${state.photoClick.data._id}`).then((result) => {
      setCommentList(result.data)
    })
  }, [])
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        onClick={() => {
          navigate('/content/comment')
        }}
        style={{
          width: '88%',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        댓글 {state.photoClick.data.comment.length}개 모두 보기
      </div>
    </div>
  )
}
