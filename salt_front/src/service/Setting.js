import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginCheckOk } from "../store/store";
import styles from "./Main.module.css";
import page from "./Page.module.css";
export default function Setting() {
  const state = useSelector((state) => {
    return state;
  });
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  const [helpBtn, setHelpBtn] = useState("img/button/inputhelp.png");
  const [logoutBtn, setLogoutBtn] = useState("img/button/inputlogout.png");
  const [exitBtn, setExitBtn] = useState("img/button/inputexit.png");
  return (
    <div className={page.service_page}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: "-1",
        }}
      >
        <img style={{ width: "8%" }} src="/img/title/top.png" />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div
          className={styles.login_input}
          onClick={() => {
            navigate("/ToHuppy");
          }}
          onTouchStart={() => {
            setHelpBtn("img/button/inputhelp-1.png");
          }}
          onTouchEnd={() => {
            navigate("/ToHuppy");
            setHelpBtn("img/button/inputhelp.png");
          }}
          style={{
            position: "relative",
            border: "0px",
            boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
          }}
        >
          <img
            src={helpBtn}
            style={{
              position: "absolute",
              display: "flex",
              width: "100%",
              boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
            }}
          />
          <button
            style={{
              opacity: "0",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            type="submit"
          ></button>
        </div>

        <div
          className={styles.login_input}
          onClick={() => {
            logout();
            loginCheckOk();
          }}
          onTouchStart={() => {
            setLogoutBtn("img/button/inputlogout-1.png");
          }}
          onTouchEnd={() => {
            logout();
            loginCheckOk();
            setLogoutBtn("img/button/inputlogout.png");
          }}
          style={{
            position: "relative",
            border: "0px",
            boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
          }}
        >
          <img
            src={logoutBtn}
            style={{
              position: "absolute",
              display: "flex",
              width: "100%",
              boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
            }}
          />
          <button
            style={{
              opacity: "0",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            type="submit"
          ></button>
        </div>

        <div
          className={styles.login_input}
          onClick={() => {
            navigate("/user/remove");
          }}
          onTouchStart={() => {
            setExitBtn("img/button/inputexit-1.png");
          }}
          onTouchEnd={() => {
            navigate("/user/remove");
            setExitBtn("img/button/inputexit.png");
          }}
          style={{
            position: "relative",
            border: "0px",
            boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
          }}
        >
          <img
            src={exitBtn}
            style={{
              position: "absolute",
              display: "flex",
              width: "100%",
              boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
            }}
          />
          <button
            style={{
              opacity: "0",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            type="submit"
          ></button>
        </div>
        {state.adminCheck.admin ? (
          <div
            onClick={() => {
              navigate("/admin");
            }}
          >
            관리자 페이지
          </div>
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          zIndex: "-1",
        }}
      >
        <img style={{ width: "8%" }} src="/img/title/bottom.png" />
      </div>
    </div>
  );
}
