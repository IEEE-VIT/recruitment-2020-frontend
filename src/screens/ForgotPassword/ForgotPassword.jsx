import React, { useState } from "react";
import "./ForgotPassword.css";
import { Redirect } from "react-router-dom";
import { forgotPasswordUtil } from "../../utils/userHelperFuncs";
import { ToastContainer } from "react-toastify";
import LoadingIndicator from "../../uiComponents/LoadingIndicator/LoadingIndicator";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [next, setNext] = useState(false);
  const [loading,setLoading] = useState(false);
  const emailVerif = async () => {
    if(!loading){
      setLoading(true);
      const resp = await forgotPasswordUtil(email);
      setLoading(false);
      if (resp) {
        setNext(true);
      }
      else {
        return null;
      }
    }
    return null;
  };
  return (
    <div id="forgot-pass-container">
      <div id="forgot-pass-header">
        <h2>Forgot password</h2>
      </div>
      <div id="forgot-pass-body">
        <p>
          Enter your vit email-id.
          <br /> We will send an OTP to your email.
        </p>
        <input
          type="email"
          value={email}
          placeholder="VIT mail ID"
          onChange={(newEmail) => setEmail(newEmail.target.value)}
          className="forgot-pass-input-field"
        />
        <div onClick={() => emailVerif()} className={loading?"disabled-submit-btn forgot-pass-submit" :"forgot-pass-submit"} >
          {loading? <LoadingIndicator/> : "SEND OTP"}
        </div>
        {next ? (
          <Redirect
            push
            to={{ pathname: "/otp-verify", state: { email: email } }}
          />
        ) : null}
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

export default ForgotPassword;