import { configureStore, createSlice } from "@reduxjs/toolkit";

let resize = createSlice({
  name: "resize",
  initialState: 0,
  reducers: {
    setResize(state, action) {
      return (state = action.payload);
    },
  },
});

let loginCheck = createSlice({
  name: "loginCheck",
  initialState: {
    check: false,
    id: "",
    nickName: "",
    profile: "",
    todayPhoto: 0,
  },
  reducers: {
    loginCheckOk(state, action) {
      return (state = {
        check: action.payload.ok,
        id: action.payload.user.id,
        nickName: action.payload.user.nickName,
        profile: action.payload.user.profilePhoto,
        todayPhoto: action.payload.user.todayPhoto,
      });
    },
    loginProfile(state, action) {
      state.profile = action.payload;
    },
    loginCameraCheck(state, action) {
      state.todayPhoto = action.payload;
    },
  },
});

let adminCheck = createSlice({
  name: "adminCheck",
  initialState: {
    admin: false,
  },
  reducers: {
    adminChecker(state, action) {
      state.admin = action.payload;
    },
  },
});

let todayMission = createSlice({
  name: "todayMission",
  initialState: "",
  reducers: {
    todayMissionChange(state, action) {
      return (state = action.payload);
    },
  },
});

let peoplePhoto = createSlice({
  name: "peoplePhoto",
  initialState: { data: "" },
  reducers: {
    changePeoplePhoto(state, action) {
      state.data = action.payload;
    },
    peoplePhotoLike(state, action) {
      state.data.map((a) => {
        if (a._id === action.payload._id) {
          return (a.like = action.payload.like);
        }
      });
    },
  },
});

let personPhoto = createSlice({
  name: "personPhoto",
  initialState: { data: "" },
  reducers: {
    changePersonPhoto(state, action) {
      state.data = action.payload;
    },
    personPhotoLike(state, action) {
      if (state.data.length > 0) {
        state.data.map((a) => {
          if (a._id === action.payload._id) {
            return (a.like = action.payload.like);
          }
        });
      }
    },
  },
});

let photoClick = createSlice({
  name: "photoClick",
  initialState: { click: false, data: "" },
  reducers: {
    onPhotoClick(state, action) {
      return (state = { click: true, data: action.payload });
    },
    offPhotoClick(state, action) {
      state.click = false;
    },
    changeLikeArray(state, action) {
      state.data.like = action.payload;
    },
    changeCommentArray(state, action) {
      state.data.comment = action.payload;
    },
  },
});

let uploadSwitch = createSlice({
  name: "uploadSwitch",
  initialState: false,
  reducers: {
    onUploadSwitch(state, action) {
      return (state = true);
    },
    offUploadSwitch(state, action) {
      return (state = false);
    },
  },
});

export let { loginCheckOk, loginProfile, loginCameraCheck } =
  loginCheck.actions;
export let { adminChecker } = adminCheck.actions;
export let { todayMissionChange } = todayMission.actions;
export let { changePeoplePhoto, peoplePhotoLike } = peoplePhoto.actions;
export let { changePersonPhoto, personPhotoLike } = personPhoto.actions;
export let {
  onPhotoClick,
  offPhotoClick,
  changeLikeArray,
  changeCommentArray,
} = photoClick.actions;
export let { onUploadSwitch, offUploadSwitch } = uploadSwitch.actions;
export let { setResize } = resize.actions;
export default configureStore({
  reducer: {
    resize: resize.reducer,
    loginCheck: loginCheck.reducer,
    adminCheck: adminCheck.reducer,
    peoplePhoto: peoplePhoto.reducer,
    personPhoto: personPhoto.reducer,
    photoClick: photoClick.reducer,
    uploadSwitch: uploadSwitch.reducer,
    todayMission: todayMission.reducer,
  },
});
