import React from "react";
import './mainLoading.css'

const MainLoaidng = () => {
  return (
    <>
      <div className="d-flex justify-content-center item-center" style={{ position: "absolute", textAlign: "center", top: "35%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <p style={{ color: "#77ced9", fontSize: "60px", fontWeight: "bold" }}><img src="assets/images/g-logo.png" alt="Dzital" style={{ width: "50px", height: "50px", marginBottom: "10px" }} />zital</p>
      </div>
      <hr />
      <svg
        style={{
          left: "50%",
          top: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0)"
        }}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 187.3 93.7"
        height="300px"
        width="400px"
      >
        <path
          d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
          strokeMiterlimit={10}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={4}
          fill="none"
          id="outline"
          stroke="#77ced9"
        />
        <path
          d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
          strokeMiterlimit={10}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={4}
          stroke="#4E4FEB"
          fill="none"
          opacity="0.05"
          id="outline-bg"
        />
      </svg>

    </>
  );
};

export default MainLoaidng;
