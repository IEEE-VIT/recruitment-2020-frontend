import React, { useEffect, useState } from "react";
import "./LandingScreen.css";
import { useCookies } from "react-cookie";
import instance from "../../apis/recruitmentApi";
import ieee_vit_logo from "../../assets/ieee_vit_logo.svg";
import mail_logo from "../../assets/mail_logo.svg";
import twitter_logo from "../../assets/twitter_logo.svg";
import insta_logo from "../../assets/insta_logo.svg";
import github_logo from "../../assets/github_logo.svg";
import facebook_logo from "../../assets/facebook_logo.svg";
import linkedin_logo from "../../assets/linkedin_logo.svg";
import SignupComponent from "../../uiComponents/SignupComponent/SignupComponent";
import { signUpUser, toastError } from "../../utils/userHelperFuncs";
import { ToastContainer } from "react-toastify";
import { Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const LandingScreen = () => {
  const [visibleComp, setVisibleComp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [signUpIndicator, setSignUpIndicator] = useState(true);
  const [logInIndicator, setLogInIndicator] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [next, setNext] = useState(false);
  const [goToForm, setGoToForm] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  useEffect(() => {
    if (recaptchaToken !== null) {
      signUpUser(
        regNo.trim(),
        email.trim(),
        pass,
        confirmPass,
        signUpIndicator,
        cookies,
        setCookie,
        removeCookie,
        setLoading,
        recaptchaToken
      );
    }
    // eslint-disable-next-line
  }, [recaptchaToken]);

  useEffect(() => {
    if (cookies.token !== "undefined" && cookies.token !== undefined) {
      const checkFilled = async () => {
        instance
          .get("/api/r0/filledwhy", {
            headers: { Authorization: `Bearer ${cookies.token}` },
          })
          .then((response) => {
            if (!response.data.data) {
              setGoToForm(true);
            } else {
              setNext(true);
            }
          })
          .catch(() => {
            toastError("Something went wrong! Please Try Again!");
          });
      };
      checkFilled();
    }
  }, [cookies.token]);

  function toggleVisibleComp() {
    setVisibleComp(!visibleComp);
  }

  return (
    <div id="screen-container">
      <div id="signup-component">
        <SignupComponent
          signUpUser={() => {
            signUpUser(
              regNo.trim(),
              email.trim(),
              pass,
              confirmPass,
              signUpIndicator,
              cookies,
              setCookie,
              removeCookie,
              setLoading,
              recaptchaToken
            );
          }}
          regNo={regNo}
          setRegNo={setRegNo}
          email={email}
          setEmail={setEmail}
          pass={pass}
          setPass={setPass}
          showPass={showPass}
          setShowPass={setShowPass}
          confirmPass={confirmPass}
          setConfirmPass={setConfirmPass}
          signUpIndicator={signUpIndicator}
          setSignUpIndicator={setSignUpIndicator}
          logInIndicator={logInIndicator}
          setLogInIndicator={setLogInIndicator}
          setRecaptchaToken={setRecaptchaToken}
          loading={loading}
        />
      </div>
      <div
        id="signup-component-mobile"
        className={visibleComp ? "visible-signup" : "invisible-signup"}
      >
        <SignupComponent
          signUpUser={() => {
            signUpUser(
              regNo.trim(),
              email.trim(),
              pass,
              confirmPass,
              signUpIndicator,
              cookies,
              setCookie,
              removeCookie,
              setLoading,
              recaptchaToken
            );
          }}
          closeComp={toggleVisibleComp}
          regNo={regNo}
          setRegNo={setRegNo}
          email={email}
          setEmail={setEmail}
          pass={pass}
          setPass={setPass}
          showPass={showPass}
          setShowPass={setShowPass}
          confirmPass={confirmPass}
          setConfirmPass={setConfirmPass}
          signUpIndicator={signUpIndicator}
          setSignUpIndicator={setSignUpIndicator}
          logInIndicator={logInIndicator}
          setLogInIndicator={setLogInIndicator}
          loading={loading}
          setRecaptchaToken={setRecaptchaToken}
        />
      </div>
      <div
        id="overlay"
        onClick={toggleVisibleComp}
        className={visibleComp ? "visible-overlay" : "invisible-overlay"}
      ></div>
      <div id="bg-1"></div>
      <div id="bg-2"></div>
      <div style={{ width: "100%" }}>
        <div id="ieee-logo">
          <a
            href="https://ieeevit.org"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={ieee_vit_logo} alt="logo" />
          </a>
        </div>
        <div id="page-content">
          <h1 className="page-content-heading">Core Committee</h1>
          <h1 className="page-content-heading">Selections</h1>
          <h3>
            A community of students passionate about tech.{" "}
            <br className="landing-page-line-break" /> Come for the experience,
            stay for the challenge!
          </h3>
        </div>
      </div>
      <div id="register-btn" onClick={toggleVisibleComp}>
        Register Now
      </div>
      <div id="social-media-handles">
        <a
          href="https://www.instagram.com/ieeevitvellore/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img id="first-social-media-handle" src={insta_logo} alt="social" />
        </a>
        <a
          href="https://twitter.com/ieeevitvellore"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={twitter_logo} alt="social" />
        </a>
        <a
          href="https://github.com/IEEE-VIT"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={github_logo} alt="social" />
        </a>
        <a
          href="https://in.linkedin.com/company/ieee-vit-vellore"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={linkedin_logo} alt="social" />
        </a>
        <a
          href="https://www.facebook.com/IEEEVIT/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={facebook_logo} alt="social" />
        </a>
        <a
          href="mailto:contact@ieeevit.org"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={mail_logo} alt="social" />
        </a>
      </div>
      <div className="absolute-pos">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          style={{ padding: "12px 12px" }}
        />
      </div>
      {goToForm ? <Redirect push to="/form" /> : null}
      {next ? <Redirect push to="/coming-soon" /> : null}
    </div>
  );
};

export default LandingScreen;
