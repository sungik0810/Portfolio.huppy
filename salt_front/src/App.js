import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import "./App.css";
import AdminPage from "./service/adminpage/AdminPage";
import AdminPageView from "./service/adminpage/AdminPageView";

import Login from "./service/Login";
import Main from "./service/Main";
import Register from "./service/Register";
import {
  adminChecker,
  changePeoplePhoto,
  loginCheckOk,
  setResize,
  todayMissionChange,
} from "./store/store";
import ReactGA from "react-ga";
import RouteChangeTracker from "./RouteChangeTracker";
import { Helmet } from "react-helmet-async";
const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
ReactGA.initialize(TRACKING_ID);
axios.defaults.timeout = 0;
// const LOCAL_HOST = "https://2bb0-121-135-163-250.jp.ngrok.io";
const LOCAL_HOST = "https://eaf1-121-135-163-250.jp.ngrok.io";
export { LOCAL_HOST };
function App() {
  RouteChangeTracker();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let state = useSelector((state) => {
    return state;
  });
  const [extraTime, setExtraTime] = useState("");
  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(setResize(window.innerHeight));
    });

    const time = setTimeout(() => {
      dispatch(setResize(window.innerHeight));
    }, 0.0000000000000000001);

    return () => {
      window.removeEventListener("resize", () => {
        dispatch(setResize(window.innerHeight));
      });

      clearTimeout(time);
    };
  }, [state.resize]);
  const [pageNum, setPageNum] = useState(0);
  useEffect(() => {
    // Feed Call

    axios.get(`/peoplephoto/${pageNum}`).then((result) => {
      setPageNum(pageNum);
      const datas = [...result.data];
      dispatch(changePeoplePhoto(datas));
    });

    // check otken -> user
    const token = localStorage.getItem("token");
    if (token !== null) {
      axios
        .post("/checkToken", {
          token,
        })
        .then((result) => {
          dispatch(loginCheckOk(result.data));
          if (result.data.user.admin) {
            dispatch(adminChecker(result.data.user.admin));
          }
        });
    }
  }, []);

  // check user -> navigate
  useEffect(() => {
    // navigate("/home");
    if (state.loginCheck.check) {
      navigate("/home");
    } else if (state.adminCheck.admin) {
    } else {
      navigate("/");
    }
  }, [state.loginCheck, state.adminCheck]);
  useState(() => {
    axios.get("/admin/mission/data").then((result) => {
      if (result.data.mission) {
        dispatch(todayMissionChange(result.data.mission));
      }
    });
  });
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  useEffect(() => {
    function timer() {
      const time = new Date();
      let getHour = String(time.getHours()).padStart(2, "0");
      let getMinute = String(time.getMinutes()).padStart(2, "0");
      let getSecond = String(time.getSeconds()).padStart(2, "0");
      const timerHours = `${23 - parseInt(getHour)}`.padStart(2, "0");
      const timerMinutes = `${59 - parseInt(getMinute)}`.padStart(2, "0");
      const timerSeconds = `${59 - parseInt(getSecond)}`.padStart(2, "0");
      const extraTimer = `${timerHours}:${timerMinutes}:${timerSeconds}`;
      return extraTimer;
    }
    setInterval(() => {
      const tt = timer();
      setExtraTime(tt);
    }, 1000);
  }, []);

  return (
    <Routes location={location}>
      {/* <Route path="*" element={<Outlet />} /> */}
      {/* <Route path="/" element={<Main Link={Link} />} /> */}
      <Route path="/" element={<Login Link={Link} />} />
      <Route
        path="/home"
        element={<Main Link={Link} extraTime={extraTime} />}
      />
      <Route
        path={`/mypage/${state.loginCheck.id}`}
        element={<Main Link={Link} />}
      />
      <Route
        path={`/mypage/${state.loginCheck.id}/profile`}
        element={<Main Link={Link} />}
      />
      <Route
        path={`/mypage/${state.loginCheck.id}/alarm`}
        element={<Main Link={Link} />}
      />
      <Route path="/setting" element={<Main Link={Link} />} />
      <Route path="/upload" element={<Main Link={Link} />} />
      <Route path="/register" element={<Register Link={Link} />} />
      <Route path="/ToHuppy" element={<Main Link={Link} />} />
      <Route path="/user/remove" element={<Main Link={Link} />} />
      <Route path="/content" element={<Main Link={Link} />} />
      <Route path="/content/comment" element={<Main Link={Link} />} />
      <Route path="/admin" element={<AdminPage Link={Link} />} />
      <Route path="/admin/view" element={<AdminPageView Link={Link} />} />
    </Routes>
  );
}

export default App;
// /mypage/${state.loginCheck.id}/alarm
