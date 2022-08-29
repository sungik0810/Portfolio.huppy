import axios from "axios";
import page from "../Page.module.css";
export default function ToHuppy() {
  function sendMessage(e) {
    e.preventDefault();

    axios.post("/ToHuppy", { ToHuppy: e.target[0].value }).then((result) => {
      console.log(result);
    });
  }
  return (
    <div className={page.service_page}>
      <div>
        <form onSubmit={sendMessage}>
          <input></input>
          <button type="submit">전송</button>
        </form>
      </div>
      <div></div>
    </div>
  );
}
