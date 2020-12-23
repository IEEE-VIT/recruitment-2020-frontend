import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import { Redirect } from "react-router-dom";
import { ResetPasswordUtil } from "../../utils/userHelperFuncs";
import { ToastContainer } from "react-toastify";
import LoadingIndicator from "../../uiComponents/LoadingIndicator/LoadingIndicator";

const ResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    if (props.location.state == null) {
      window.location.href = "/forgot-password";
    } else {
      setEmail(props.location.state.email);
      setOtp(props.location.state.otp);
    }
  }, [props.location.state]);
  const resetPasswordBackend = async () => {
    setLoading(true);
    const resp = await ResetPasswordUtil(email, otp, pass, confirmPass);
    setLoading(false);
    if (resp[1]) {
      setTimeout(() => {
        setNext(true);
      }, 4000);
    } else {
      if (resp[0] === "otp") {
        setTimeout(() => {
          setPrev(true);
        }, 4000);
      }
    }
  };
  return (
    <div id="reset-pass-container">
      <div id="reset-pass-header">
        <h2>Forgot password</h2>
      </div>
      <div id="reset-pass-body">
        <p>Enter your new password and save changes to login</p>
        <input
          type="password"
          value={pass}
          placeholder="New password"
          onChange={(newPass) => setPass(newPass.target.value)}
          className="reset-pass-input-field"
        />
        <input
          type="password"
          value={confirmPass}
          placeholder="Confirm new password"
          onChange={(newConfirmPass) =>
            setConfirmPass(newConfirmPass.target.value)
          }
          className="reset-pass-input-field"
        />
        <div
          onClick={() => resetPasswordBackend()}
          className={loading?"disabled-submit-btn reset-pass-submit" :"reset-pass-submit"}
        >
          {loading? <LoadingIndicator/> : "SAVE CHANGES"}
        </div>
        {next ? <Redirect push to="/" /> : null}
        {prev ? <Redirect push to="/forgot-password" /> : null}
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
    </div>
  );
};

export default ResetPassword;