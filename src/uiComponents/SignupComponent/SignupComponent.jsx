import React from "react";
import "./SignupComponent.css";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ReCAPTCHA from "react-google-recaptcha";

const SignupComponent = ({
  setSignUpIndicator,
  setLogInIndicator,
  signUpIndicator,
  logInIndicator,
  setShowPass,
  showPass,
  signUpUser,
  closeComp,
  regNo,
  setRegNo,
  setName,
  email,
  setEmail,
  pass,
  setPass,
  confirmPass,
  setConfirmPass,
  loading,
  setRecaptchaToken,
}) => {
  const recaptchaRef = React.createRef();

  function toggleIndicators() {
    setSignUpIndicator(!signUpIndicator);
    setLogInIndicator(!logInIndicator);
  }
  function toggleShowPass() {
    setShowPass(!showPass);
  }

  const getRecap = (token) => {
    return new Promise((resolve, reject) => {
      resolve(setRecaptchaToken(token));
    });
  };

  const handleSubmit = async () => {
    const token = await recaptchaRef.current.executeAsync();
    await getRecap(token);
  };

  const handleLogin = () => {
    signUpUser();
  };

  return (
    <div className="signup-login-container">
      <div id={logInIndicator ? "login-container" : "signup-container"}>
        <div id="signup-header">
          <h4
            className={signUpIndicator ? "thisison" : "thisisoff"}
            onClick={() => {
              if (!signUpIndicator) {
                toggleIndicators();
              }
            }}
          >
            Sign Up
          </h4>
          <h4
            className={logInIndicator ? "thisison" : "thisisoff"}
            onClick={() => {
              if (!logInIndicator) {
                toggleIndicators();
              }
            }}
          >
            Log In
          </h4>
        </div>
        <div className="signup-elements">
          <TextField
            style={{ width: "100%" }}
            id="outlined-basic"
            type="text"
            value={regNo}
            label="Registration No."
            onChange={(newRegNo) => {
              setRegNo(newRegNo.target.value);
            }}
          />
        </div>
        <div className={logInIndicator ? "disappear" : "signup-elements"}>
          <TextField
            style={{ width: "100%" }}
            id="outlined-basic"
            type="email"
            value={email}
            label="VIT mail ID"
            onChange={(newEmail) => {
              setEmail(newEmail.target.value);
            }}
          />
        </div>
        <div className="signup-elements">
          <TextField
            style={{ width: "100%" }}
            id="outlined-basic"
            type={showPass ? "text" : "password"}
            value={pass}
            label="Password"
            onChange={(newPass) => {
              setPass(newPass.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPass}
                  >
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={logInIndicator ? "disappear" : "signup-elements"}>
          <TextField
            style={{ width: "100%" }}
            id="outlined-basic"
            type="password"
            value={confirmPass}
            label="Confirm Password"
            onChange={(newConfirmPass) => {
              setConfirmPass(newConfirmPass.target.value);
            }}
          />
        </div>
        <div
          className={signUpIndicator ? "disappear" : "dummy-class"}
          id="forgot-password"
        >
          Forgot Password?{" "}
          <a
            style={{ color: "#0088FF", textDecoration: "underline" }}
            href="/forgot-password"
            target="_blank"
          >
            Click here
          </a>
        </div>
        <div
          id="submit-button"
          className={loading ? "disabled-submit-btn" : "dummy-class"}
          onClick={() => {
            signUpIndicator ? handleSubmit() : handleLogin();
          }}
        >
          {loading ? (
            <LoadingIndicator />
          ) : signUpIndicator ? (
            "SIGN UP"
          ) : (
            "LOG IN"
          )}
        </div>
      </div>
      <div style={{ display: "none" }}>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.REACT_APP_SITE_KEY}
          theme="dark"
        />
      </div>
    </div>
  );
};

export default SignupComponent;
