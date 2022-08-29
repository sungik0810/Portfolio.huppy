import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changePeoplePhoto,
  changePersonPhoto,
  loginCameraCheck,
  onUploadSwitch,
} from "../../store/store";
import ImageCrop from "../utils/Crop/ImageCrop.tsx";

export default function FeedUploadModal() {
  let state = useSelector((state) => {
    return state;
  });

  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [userImg, setUserImg] = useState([]);
  const [nextBtn, setNextBtn] = useState(false);
  //기존
  // const handlePhotoSubmit = (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("myImg", userImg[0]);
  //   formData.append("userId", state.loginCheck.id);
  //   formData.append("userNickName", state.loginCheck.nickName);
  //   formData.append("userProfile", state.loginCheck.profile);
  //   axios
  //     .post("/upload", formData)
  //     .then((result) => {
  //       setUserImg([]);
  //       dispatch(loginCameraCheck(1));
  //       console.log(result);
  //     })
  //     .catch((result) => {
  //       console.log(result + "!!!error!!!");
  //     });
  //   axios
  //     .get("/peoplephoto")
  //     .then((result) => {
  //       console.log("단체이미지 다시 확보");
  //       const datas = [...result.data];
  //       dispatch(changePeoplePhoto(datas));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   if (state.loginCheck.check) {
  //     axios
  //       .post("/personphoto", { user: state.loginCheck })
  //       .then((result) => {
  //         console.log("개인이미지 확보");
  //         const personDatas = [...result.data];
  //         dispatch(changePersonPhoto(personDatas));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  return <ImageCrop />;
}
