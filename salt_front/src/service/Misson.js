import { useSelector } from "react-redux";

export default function Misson() {
  const state = useSelector((state) => {
    return state;
  });
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "768px",
        height: "100%",
        minHeight: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "70%",
            border: "3px solid #F9B199",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <div>오늘의 미션</div> */}
            <div>
              <h2 style={{ fontStyle: "oblique" }}>{state.todayMission}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
