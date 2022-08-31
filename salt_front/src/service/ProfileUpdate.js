import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginCheckOk, loginProfile } from "../store/store";
import page from "./Page.module.css";
import { LOCAL_HOST } from "../App";
export default function ProfileUpdate() {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [profileImg, setProfileImg] = useState([]);

  const handleProfileSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    //프로필 이미지 프론트에서 바꾸기
    if (profileImg[0] !== undefined) {
      dispatch(loginProfile(`${profileImg[0].name}`));

      const formData = new FormData();
      formData.append("myProfile", profileImg[0]);
      formData.append("user", JSON.stringify(state.loginCheck));

      axios
        .post("/profile/upload", formData)
        .then((result) => {
          setProfileImg([]);
          localStorage.removeItem("token");
          localStorage.setItem("token", result.data.token);
          dispatch(loginCheckOk(result.data));
          navigate(`/mypage/${state.loginCheck.id}`);
        })
        .catch((result) => {
          console.log(result + "!!!error!!!");
        });
    }
  };
  const handleProfileUpload = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setProfileImg(e.target.files);
  };
  const [save, setSave] = useState("/img/button/inputsave.png");
  return (
    <form
      onClick={(e) => {
        e.stopPropagation();
      }}
      encType="multipart/form-data"
      onSubmit={handleProfileSubmit}
      className={page.service_page}
    >
      {" "}
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <img style={{ width: "8%" }} src="/img/title/top.png" />
      </div>
      {/* 사진 */}
      <div
        className={page.service_page_bottom}
        style={{
          height: "25.5%",
          minHeight: "158px",
          borderBottom: "1px solid #E8E2E2",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              minWidth: "60px",
              maxWidth: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#AAAAAA",
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
              }}
            >
              {profileImg[0] === undefined ? (
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={`${LOCAL_HOST}/profile/${state.loginCheck.profile}`}
                />
              ) : (
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={URL.createObjectURL(profileImg[0])}
                  alt="#"
                />
              )}
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              height: "70%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                zIndex: "-1",
                position: "absolute",
                objectFit: "contain",
                width: "50%",
                height: "20%",
              }}
            >
              <img
                src="/img/button/change-photo.png"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <input
              style={{ width: "50%", height: "20%", opacity: "0" }}
              onClick={() => {}}
              onChange={handleProfileUpload}
              name="myProfile"
              accept="image/*"
              type="file"
            ></input>{" "}
          </div>
        </div>
      </div>
      {/* 이름 */}
      <div
        className={page.service_page_bottom}
        style={{
          height: "8.2%",
          maxHeight: "50px",
          borderBottom: "1px solid #E8E2E2",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div
          style={{
            width: "35.5%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          아이디
        </div>
        <div
          style={{
            width: "64.5%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {state.loginCheck.id}
        </div>
      </div>
      {/* 닉네임 */}
      <div
        className={page.service_page_bottom}
        style={{
          height: "8.2%",
          maxHeight: "50px",
          borderBottom: "1px solid #E8E2E2",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "35.5%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          사용자 이름
        </div>
        <div
          style={{
            width: "64.5%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <input placeholder={state.loginCheck.nickName}></input> */}
          {state.loginCheck.nickName}
        </div>
      </div>
      {/* 빈칸 */}
      <div
        className={page.service_page_bottom}
        style={{ height: "26.3%", borderBottom: "1px solid #E8E2E2" }}
      ></div>
      {/* 저장 버튼 */}
      <div
        className={page.service_page_bottom}
        style={{ height: "31.8%", position: "relative" }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <img style={{ width: "8%" }} src="/img/title/bottom.png" />
        </div>
        <img
          style={{
            position: "absolute",
            width: "77%",
            height: "31%",
            maxWidth: "300px",
            maxHeight: "60px",
          }}
          src={save}
        />
        <button
          onTouchStart={() => {
            setSave("/img/button/inputsave-1.png");
          }}
          onTouchEnd={() => {
            setSave("/img/button/inputsave.png");
          }}
          type="submit"
          style={{
            opacity: "0",
            position: "absolute",
            width: "77%",
            height: "31%",
            maxWidth: "300px",
            maxHeight: "60px",
          }}
        ></button>
      </div>
    </form>
  );
}
