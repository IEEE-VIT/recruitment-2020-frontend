import React from "react";
import CloseIcon from "@material-ui/icons/Close";

import "../RoundDetails/RoundDetails.css";

const InterviewReady = () => {
  return (
    <div id="interview-ready">
      <div id="interview-ready-header">
        <h5 style={{ color: "#000000" }}>Interview</h5>
        {/* <img src={CloseIcon} alt="" /> */}
        <CloseIcon
          id="close-icon-modal"
          style={{ zIndex: 5, display: "flex" }}
          //   onClick={() => setReady(false)}
        />
      </div>
      <div
        id="interview-ready-body"
        style={{ color: "#000000", whiteSpace: "normal" }}
      >
        Great. You’ll receive an email shortly, keep checking your inbox for the
        meeting link. You can not give an interview if your slot has passed
      </div>
    </div>
  );
};

export default InterviewReady;
