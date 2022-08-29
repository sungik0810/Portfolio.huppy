import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOCAL_HOST } from "../../App";

export default function AlarmList({ totalAlarm, alarmList, setAlarmList }) {
  const state = useSelector((state) => {
    return state;
  });
  const navigate = useNavigate();
  const [isPostingComment, setPostingComment] = useState(false);
  function deleteLikeAlarm() {
    if (isPostingComment) {
      console.warn("already posting another comment");
      return;
    }
    setPostingComment(true);
    axios
      .post("/alarm/like/delete", {
        user: state.loginCheck,
        target: totalAlarm,
      })
      .then((result) => {
        const total_alarmList = [
          ...result.data.like_alarm,
          ...result.data.comment_alarm,
        ];
        setAlarmList([...total_alarmList]);
      })
      .catch((error) => {})
      .finally(() => setPostingComment(false));
  }
  function deleteCommentAlarm() {
    if (isPostingComment) {
      console.warn("already posting another comment");
      return;
    }
    setPostingComment(true);
    axios
      .post("/alarm/comment/delete", {
        user: state.loginCheck,
        target: totalAlarm,
      })
      .then((result) => {
        const total_alarmList = [
          ...result.data.like_alarm,
          ...result.data.comment_alarm,
        ];
        setAlarmList([...total_alarmList]);
      })
      .catch((error) => {})
      .finally(() => setPostingComment(false));
  }

  return totalAlarm.label == "like" ? (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "10%",
        background: "blue",
      }}
    >
      <div
        style={{
          width: "30%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            maxWidth: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "grey",
            borderRadius: "50%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              background: "red",
            }}
          >
            <img
              style={{ height: "100%" }}
              src={`${LOCAL_HOST}/profile/${totalAlarm.user_profile}`}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {totalAlarm.user_nickName}님이 좋아요를 누르셨습니다.
      </div>
      <div
        style={{
          width: "20%",
          height: "100%",
          background: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={deleteLikeAlarm}
      >
        삭제
      </div>
    </div>
  ) : (
    totalAlarm.label == "comment" && (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "10%",
          background: "green",
        }}
      >
        <div
          style={{
            width: "30%",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              maxWidth: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "grey",
              borderRadius: "50%",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                background: "red",
              }}
            >
              <img
                style={{ height: "100%" }}
                src={`${LOCAL_HOST}/profile/${totalAlarm.user_profile}`}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {totalAlarm.user_nickName}님이 댓글을 남기셨습니다.
        </div>
        <div
          style={{
            width: "20%",
            height: "100%",
            background: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={deleteCommentAlarm}
        >
          삭제
        </div>
      </div>
    )
  );
}
