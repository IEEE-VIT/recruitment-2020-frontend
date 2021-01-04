import React,{useState} from "react";
import './ResultsHomeScreen.css';
import ieee_vit_logo from "../../assets/ieee_vit_logo.svg";
import ieee_mascot from "../../assets/ieee_mascot.svg";
import { toastError } from "../../utils/userHelperFuncs";
import { ToastContainer} from "react-toastify";

const ResultsHomeScreen=()=>{
    const [regno,setRegno] = useState("");
    const regnoRegex = RegExp("^[2][0][b|B]([a-zA-Z]){2}([0-9]){4}$");
    const regnosubmit = () => {
        if (regno === "") {
            toastError("Please enter a registration number!");
        }
        else if(!regnoRegex.test(regno)) {
            toastError(
              "Please ensure you are a fresher and are entering the right registration number!"
            );
        }
    };
    return <div id="results-home-container">
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
                <div id="results-home-submit-btn" onClick={()=>regnosubmit()}>I'm Feeling Lucky!</div>
            </div>
            <img src={ieee_mascot} alt="ieee mascot 3d character"/>
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
};

export default ResultsHomeScreen;