import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOCAL_HOST } from "../App";
import {
  changeLikeArray,
  offPhotoClick,
  peoplePhotoLike,
  personPhotoLike,
} from "../store/store";
import Home from "./home";
import Mypage from "./Mypage";
import NavBottom from "./NavBottom";
import NavTop from "./NavTop";
import ProfileUpdate from "./ProfileUpdate";
import Setting from "./Setting";
import page from "./Page.module.css";
import Like from "./FeedModal/Like.js";
import FeedImage from "./FeedModal/FeedImage.js";
import FeedProfile from "./FeedModal/FeedProfile.js";
import Comment from "./FeedModal/Comment.js";
import FeedUploadModal from "./FeedModal/FeedUploadModal";
import Alarm from "./Alarm/Alarm";
import ToHuppy from "./ToHuppy/ToHuppy";
function Main({ extraTime }) {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [feedUploadModalSwitch, setFeedUploadModalSwitch] = useState(false);

  return (
    <div className={page.main_service_page}>
      {/* 사진 업로드 */}
      {feedUploadModalSwitch === true && <FeedUploadModal />}
      {/* 이미지 클릭 */}
      {state.photoClick.click === true && (
        <div
          onClick={() => {
            dispatch(offPhotoClick());
          }}
          className={page.service_page_modal_back}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
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
                width: "100%",
                paddingTop: "3%",
                display: "flex",
                flexDirection: "column",
                // background: 'red',
                overflowY: "scroll",
              }}
            >
              <Comment />
            </div>
          </div>
        </div>
      )}

      {/* height:17.5%->13.5 */}
      <NavTop />

      {/* /home height: 68% -> 72.5% */}
      {/* <Home /> */}
      {/* /mypage height: 68% -> 72.5% */}
      {window.location.pathname === "/home" ? (
        <Home extraTime={extraTime} />
      ) : window.location.pathname === `/mypage/${state.loginCheck.id}` ? (
        <Mypage />
      ) : window.location.pathname === "/setting" ? (
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
      ) : (
        console.log("404 error")
      )}

      {/* height:14.5% */}
      <NavBottom
        feedUploadModalSwitch={feedUploadModalSwitch}
        setFeedUploadModalSwitch={setFeedUploadModalSwitch}
      />
    </div>
  );
}

export default Main;
