import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './home'
import Mypage from './Mypage'
import NavBottom from './NavBottom'
import NavTop from './NavTop'
import ProfileUpdate from './ProfileUpdate'
import Setting from './Setting'
import page from './Page.module.css'
import FeedUploadModal from './FeedModal/FeedUploadModal'
import Alarm from './Alarm/Alarm'
import ToHuppy from './ToHuppy/ToHuppy'
import UserRemove from './User/UserRemove'
import FeedClick from './FeedModal/FeedClick'

import CommentModal from './FeedModal/CommentModal'
function Main({ extraTime }) {
  const state = useSelector((state) => {
    return state
  })

  const [feedUploadModalSwitch, setFeedUploadModalSwitch] = useState(false)

  return (
    <div className={page.main_service_page}>
      {/* 사진 업로드 */}
      {feedUploadModalSwitch === true && <FeedUploadModal />}
      {/* 이미지 클릭 */}
      {window.location.pathname === '/content' && <FeedClick />}
      {window.location.pathname === '/content/comment' && <CommentModal />}
      {/* height:17.5%->13.5 */}
      <NavTop />

      {/* /home height: 68% -> 72.5% */}

      {window.location.pathname === '/home' ? (
        <Home extraTime={extraTime} />
      ) : window.location.pathname === `/mypage/${state.loginCheck.id}` ? (
        <Mypage />
      ) : window.location.pathname === '/setting' ? (
        <Setting />
      ) : window.location.pathname ===
        `/mypage/${state.loginCheck.id}/profile` ? (
        <ProfileUpdate />
      ) : window.location.pathname ===
        `/mypage/${state.loginCheck.id}/alarm` ? (
        <Alarm />
      ) : window.location.pathname === `/upload` ? (
        <FeedUploadModal />
      ) : window.location.pathname === `/ToHuppy` ? (
        <ToHuppy />
      ) : window.location.pathname === `/user/remove` ? (
        <UserRemove />
      ) : window.location.pathname === `/content` ? (
        <Home />
      ) : window.location.pathname === `/content/comment` ? (
        <Home />
      ) : null}

      {/* height:14.5% */}
      <NavBottom
        feedUploadModalSwitch={feedUploadModalSwitch}
        setFeedUploadModalSwitch={setFeedUploadModalSwitch}
      />
    </div>
  )
}

export default Main
