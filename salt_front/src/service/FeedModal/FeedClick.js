import { useDispatch } from 'react-redux'
import { offPhotoClick } from '../../store/store'
import Comment from './Comment'
import FeedImage from './FeedImage'
import FeedProfile from './FeedProfile'
import Like from './Like'
import page from '../Page.module.css'
export default function FeedClick() {
  const dispatch = useDispatch()
  return (
    <div
      onClick={() => {
        dispatch(offPhotoClick())
      }}
      className={page.service_page_modal_back}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className={page.service_page_modal_front}
      >
        {/* 프로필창 */}
        <FeedProfile />
        {/* 사진 */}
        <FeedImage />
        {/* 좋아요 */}
        <Like />
        {/* 댓글 */}
        <div
          style={{
            width: '100%',
            paddingTop: '3%',
            display: 'flex',
            flexDirection: 'column',
            // background: 'red',
            overflowY: 'scroll',
          }}
        >
          <Comment />
        </div>
      </div>
    </div>
  )
}
