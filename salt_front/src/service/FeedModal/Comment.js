import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import UserComment from './UserComment'

export default function Comment() {
  const state = useSelector((state) => {
    return state
  })

  const [commentList, setCommentList] = useState([])
  const [isPostingComment, setPostingComment] = useState(false)

  const postComment = (e) => {
    e.preventDefault()
    if (isPostingComment) {
      console.warn('already posting another comment')
      return
    }
    setPostingComment(true)
    console.log(state.photoClick)
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
      .catch((error) => {
        console.log(error)
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
        paddingTop: '6px',
        paddingBottom: '6px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <form onSubmit={postComment} style={{ display: 'flex' }}>
        <input
          type="text"
          name="comment_id"
          placeholder="댓글을 입력해주세요"
          style={{ width: '90%', height: '2rem' }}
        ></input>
        <button type="submit" style={{ width: '10%', height: '2rem' }}>
          엔터
        </button>
      </form>

      {commentList.length > 0
        ? commentList.map((comment) => {
            return <UserComment comment={comment} key={comment.comment_id} />
          })
        : null}
    </div>
  )
}
