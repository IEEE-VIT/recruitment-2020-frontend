import React, { useState, useEffect } from "react";
import "./OtpVerif.css";
import { otpVerifUtil, forgotPasswordUtil } from "../../utils/userHelperFuncs";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingIndicator from "../../uiComponents/LoadingIndicator/LoadingIndicator";

const OtpVerif = (props) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [next, setNext] = useState(false);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    if (props.location.state == null) {
      window.location.href = "/forgot-password";
    } else {
      setEmail(props.location.state.email);
    }
  }, [props.location.state]);
  const otpVerifBackend = async () => {
    if(!loading){
      setLoading(true);
      const resp = await otpVerifUtil(email, otp);
      setLoading(false);
      if (resp) {
        setNext(true);
      } else {
        return null;
      }
    }
    return null;
  };
  return (
    <div id="otp-container">
      <div id="otp-header">
        <h2>Forgot password</h2>
      </div>
      <div id="otp-body">
        <p>
          OTP mailed to {email}.<br />
          Note that the OTP is valid only for 10 minutes.
        </p>
        <input
          type="text"
          value={otp}
          onChange={(newOtp) => setOtp(newOtp.target.value)}
          placeholder="OTP"
          className="otp-input-field"
        />
        <div
          className={loading?"disabled-submit-btn otp-submit no-text-decor" :"otp-submit no-text-decor"}
          onClick={() => otpVerifBackend()}
        >
          {loading? <LoadingIndicator/> : "RESET PASSWORD"}
        </div>
        <div className="otp-options">
          <p onClick={() => forgotPasswordUtil(email, true)}>RESEND OTP</p>
          <Link to="/forgot-password" className="no-text-decor">
            <p>I USED A WRONG EMAIL</p>
          </Link>
        </div>
        {next ? (
          <Redirect
            push
            to={{
              pathname: "/reset-password",
              state: { email: email, otp: otp },
            }}
          />
        ) : null}
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

export default OtpVerif;