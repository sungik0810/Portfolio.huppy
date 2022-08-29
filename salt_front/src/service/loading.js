import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";

export default function Loading() {
  let navigate = useNavigate();
  return (
    <div
      className={styles.main}
      onLoad={() => {
        navigate("/home");
      }}
    >
      <div className={styles.bottom} style={{ height: "100%" }}>
        <div className={styles.left}></div>
        <div
          className={styles.center}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <img
              style={{
                width: "200px",
              }}
              src="img/logoTest.png"
            />
          </div>
        </div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
}
