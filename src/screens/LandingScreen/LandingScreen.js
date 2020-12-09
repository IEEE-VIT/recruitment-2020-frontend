import React,{useEffect, useState} from 'react';
import './LandingScreen.css';
import ieee_vit_logo from '../../assets/ieee_vit_logo.png';
import web_logo from '../../assets/web_logo.png';
import twitter_logo from '../../assets/twitter_logo.png';
import insta_logo from '../../assets/insta_logo.png';
import github_logo from '../../assets/github_logo.png';
import facebook_logo from '../../assets/facebook_logo.png';
import SignupComponent from '../../uiComponents/SignupComponent/SignupComponent';
import {signUpUser} from '../../utils/userHelperFuncs'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LandingScreen() {
    const axios = require('axios');
    const [visibleComp, setVisibleComp] = useState(false);
    const [name, setName] = useState("");
    const [regNo,setRegNo] = useState("20BCE0420");
    const [phoneNo,setPhoneNo] = useState("6969420690");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [confirmPass, setConfirmPass] = useState("");
    const [signUpIndicator, setSignUpIndicator] = useState(true);
    const [logInIndicator, setLogInIndicator] = useState(false);
    function toggleVisibleComp() {
        setVisibleComp(!visibleComp);
    }
    return (
        <div id="screen-container">
            <div id="signup-component">
                <SignupComponent signUpUser={()=>signUpUser(regNo.trim(),name.trim(),phoneNo.trim(),email.trim(),pass,signUpIndicator)} name={name} setName={setName} regNo={regNo} setRegNo={setRegNo} email={email} setEmail={setEmail} pass={pass} setPass={setPass}
                    showPass={showPass} setShowPass={setShowPass} confirmPass={confirmPass} setConfirmPass={setConfirmPass} signUpIndicator={signUpIndicator}
                    setSignUpIndicator={setSignUpIndicator} logInIndicator={logInIndicator} setLogInIndicator={setLogInIndicator} />
            </div>
            <div id="signup-component-mobile" className={visibleComp ? 'visible-signup' : 'invisible-signup'}>
                <SignupComponent signUpUser={()=>signUpUser(regNo.trim(),name.trim(),phoneNo.trim(),email.trim(),pass,signUpIndicator)} closeComp={toggleVisibleComp} name={name} setName={setName} regNo={regNo} setRegNO={setRegNo} email={email} setEmail={setEmail} pass={pass} setPass={setPass}
                    showPass={showPass} setShowPass={setShowPass} confirmPass={confirmPass} setConfirmPass={setConfirmPass} signUpIndicator={signUpIndicator}
                    setSignUpIndicator={setSignUpIndicator} logInIndicator={logInIndicator} setLogInIndicator={setLogInIndicator} />
            </div>
            <div id="overlay" onClick={toggleVisibleComp} className={visibleComp ? 'visible-overlay' : 'invisible-overlay'}></div>
            <div id="bg-1"></div>
            <div id="bg-2"></div>
            <div style={{ width: "100%" }}>
                <div id="ieee-logo">
                    <img src={ieee_vit_logo} />
                </div>
                <div id="page-content">
                    <h1 id="page-content-heading">Core Committee Selection</h1>
                    <h1 style={{ color: "#0088FF" }}>2020-2021</h1>
                    <h3>Do you have what it takes to be in this chapter of great minds...lol</h3>
                </div>
            </div>
            <div id="register-btn" onClick={toggleVisibleComp}>Register Now</div>
            <div id="social-media-handles">
                <a href="https://ieeevit.org/" target="_blank"><img id="first-social-media-handle" src={web_logo} /></a>
                <a href="https://twitter.com/ieeevitvellore" target="_blank"><img src={twitter_logo} /></a>
                <a href="https://www.instagram.com/ieeevitvellore/" target="_blank"><img src={insta_logo} /></a>
                <a href="https://github.com/IEEE-VIT" target="_blank"><img src={github_logo} /></a>
                <a href="https://www.facebook.com/IEEEVIT/" target="_blank"><img src={facebook_logo} /></a>
            </div>
            <div className="absolute-pos">
                <ToastContainer
                position="top-center"
                autoClose={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                style={{padding : "12px 12px"}}
                />
            </div>
        </div>
    );
}

export default LandingScreen;