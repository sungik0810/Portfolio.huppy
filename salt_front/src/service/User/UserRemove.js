import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginCheckOk } from "../../store/store";
import page from "../Page.module.css";

export default function UserRemove() {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className={page.service_page}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "40%",

          border: "3px solid #AAAAAA",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "50%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "3px solid #AAAAAA",
          }}
        >
          정말 삭제 하시겠습니까?
        </div>
        <form
          style={{
            display: "flex",
            width: "100%",
            height: "50%",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
          onSubmit={(e) => {
            axios
              .post("/user/remove", {
                user: state.loginCheck,
              })
              .then((result) => {
                dispatch(loginCheckOk(""));
                localStorage.removeItem("token");
              })
              .finally(() => {
                navigate("/");
              });
          }}
        >
          <div
            style={{
              position: "relative",
              width: "30%",
              height: "30%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              src="/img/button/inputyes.png"
            />
            <button
              type="submit"
              onClick={() => {
                // localStorage.removeItem('token')
                // loginCheckOk('')
                // navigate('/')
              }}
              style={{
                position: "absolute",
                width: "50%",
                height: "100%",
                opacity: "0",
              }}
            >
              예
            </button>
          </div>
          <div style={{ position: "relative", width: "30%", height: "30%" }}>
            <img
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              src="/img/button/inputno.png"
            />
            <button
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: "0",
              }}
              onClick={() => {
                navigate("/home");
              }}
            >
              아니오
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
