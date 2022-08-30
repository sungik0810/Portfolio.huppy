import { useDispatch, useSelector } from 'react-redux'
import { offPhotoClick } from '../../store/store'
import Comment from './Comment'
import FeedImage from './FeedImage'
import FeedProfile from './FeedProfile'
import Like from './Like'
import page from '../Page.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UserComment from './UserComment'
import { LOCAL_HOST } from '../../App'
export default function CommentModal() {
  const dispatch = useDispatch()
  const state = useSelector((state) => {
    return state
  })
  const navigate = useNavigate()
  const [commentList, setCommentList] = useState([])
  const [isPostingComment, setPostingComment] = useState(false)
  const [enter, setEnter] = useState('')
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
      onClick={() => {
        dispatch(offPhotoClick())
        navigate('/home')
      }}
      className={page.service_page_modal_back}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className={page.service_page_modal_front}
        style={{ height: '50%' }}
      >
        {/* 프로필창 */}
        <div
          style={{
            width: '100%',
            height: '20%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: '3px solid #AAAAAA',
          }}
        >
          <div style={{ width: '50%' }}>
            <img
              src="/img/title/comment-page-title.png"
              style={{ width: '100%' }}
            />
          </div>
        </div>
        {/* 사진 */}
        <div style={{ width: '100%', height: '60%', overflow: 'scroll' }}>
          {commentList.length > 0
            ? commentList.map((comment) => {
                return (
                  <UserComment comment={comment} key={comment.comment_id} />
                )
              })
            : null}
        </div>

        {/* 댓글 */}
        <div
          style={{
            width: '100%',
            height: '20%',
            borderTop: '1px solid #AAAAAA',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <form
            onSubmit={postComment}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div>
              <div
                style={{
                  overflow: 'hidden',
                  width: '36px',
                  height: '36px',
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
                    src={`${LOCAL_HOST}/profile/${state.loginCheck.profile}`}
                    alt="#"
                  />
                  {/* {console.log(comment.comment)} */}
                  {/* {console.log(state.photoClick.data)} */}
                </div>
              </div>
            </div>
            <input
              type="text"
              name="comment_id"
              placeholder="댓글을 입력해주세요"
              style={{
                width: '70%',
                height: '2.5rem',
                border: '3px solid #AAAAAA',
                borderRadius: '50px',
              }}
            ></input>
          </form>
        </div>
      </div>
    </div>
  )
}

{
  /* <div
style={{
  width: '100%',
  height: '100%',
  positon: 'absolute',
  background: 'grey',
}}
>
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
</div> */
}
