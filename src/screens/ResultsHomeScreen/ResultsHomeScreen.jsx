import React, { useState } from "react";
import "./ResultsHomeScreen.css";
import ieee_vit_logo from "../../assets/ieee_vit_logo.svg";
// import ieee_mascot from "../../assets/ieee_mascot.svg";
import { toastError } from "../../utils/userHelperFuncs";
import { ToastContainer } from "react-toastify";
import IndividualResultsScreen from "../IndividualResultsScreen/IndividualResultsScreen";

const ResultsHomeScreen = () => {
  const [regno, setRegno] = useState("");
  const [selected, setSelected] = useState("notassigned");
  const regnoRegex = RegExp("^[2][0][b|B]([a-zA-Z]){2}([0-9]){4}$");
  const acceptedPeeps = [
    "20BCE0499",
"20BEE0254",
"20BDS0116",
"20BCE0495",
"20BKT0088",
"20BKT0091",
"20BEE0240",
"20BCE0719",
"20BCE2688",
"20BCE0613",
"20BCI0106",
"20BCE2803",
"20BCE2548",
"20BBS0219",
"20BIT0268",
"20BCI0321",
"20BCT0337",
"20BCE2315",
"20BEE0120",
"20BCE0918",
"20BCE0068",
"20BCT0264",
"20BEI0013",
"20BEE0200",
"20BCE0798",
"20BCE0640",
"20BCE0554",
"20BCI0231",
"20BCE0273",
"20BEC0613",
"20BCI0250",
"20BCE0453",
"20BIT0230",
"20BCE0529",
"20BEC0265",
"20BCE0504",
"20BEE0207",
"20BCE0516",
"20BCE0139",
"20BCT0183",
"20BCE0528"
  ];
  const regnosubmit = () => {
    if (regno === "") {
      toastError("Please enter a registration number!");
    } else if (!regnoRegex.test(regno)) {
      toastError(
        "Please ensure you are a fresher and are entering the right registration number!"
      );
    } else if (acceptedPeeps.includes(regno.toUpperCase())) {
      setSelected("true");
    } else {
      setSelected("false");
    }
  };
  if (selected === "true") {
    return <IndividualResultsScreen props={{ selected: true }} />;
  } else if (selected === "false") {
    return <IndividualResultsScreen props={{ selected: false }} />;
  }
  return (
    <div id="results-home-container">
      <div id="results-home-content">
        <a href="https://ieeevit.org" target="_blank" rel="noreferrer noopener">
          <img src={ieee_vit_logo} alt="logo" id="results-ieee-logo" />
        </a>
        <div id="results-home-regno">
          <h1>Core Committee Selection Results</h1>
          <input
            type="text"
            autoFocus
            value={regno}
            placeholder="Enter your registration number"
            onChange={(newregno) => setRegno(newregno.target.value)}
            id="results-regno-input-field"
          />
          <div id="results-home-submit-btn" onClick={() => regnosubmit()}>
            I'm Feeling Lucky!
          </div>
        </div>
      </div>
      <div className="absolute-pos">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          style={{ padding: "12px 12px" }}
        />
      </div>
    </div>
  );
};

export default ResultsHomeScreen;
