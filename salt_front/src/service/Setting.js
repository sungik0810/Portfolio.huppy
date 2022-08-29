import axios from "axios";
import { useNavigate } from "react-router-dom";
import page from "./Page.module.css";
export default function Setting() {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  function userRemove() {
    // axios.delete;
  }
  return (
    <div className={page.service_page}>
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
          onClick={() => {
            navigate("/ToHuppy");
          }}
          style={{
            width: "77%",
            height: "9.8%",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "3px solid #FAD8CD",
            borderRadius: "30px",
          }}
        >
          문의
        </div>
        <div
          onClick={logout}
          style={{
            width: "77%",
            height: "9.8%",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "3px solid #FAD8CD",
            borderRadius: "30px",
          }}
        >
          로그아웃
        </div>
        <div
          style={{
            width: "77%",
            height: "9.8%",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "3px solid #FAD8CD",
            borderRadius: "30px",
          }}
        >
          회원 탈퇴
        </div>
      </div>
    </div>
  );
}
