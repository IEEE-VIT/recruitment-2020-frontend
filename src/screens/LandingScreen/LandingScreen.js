import React,{useState} from 'react';
import './landingScreen.css';
import ieee_vit_logo from '../../assets/ieee_vit_logo.png';
import web_logo from '../../assets/web_logo.png';
import twitter_logo from '../../assets/twitter_logo.png';
import insta_logo from '../../assets/insta_logo.png';

import SignupComponent from '../../uiComponents/SignupComponent/SignupComponent';
const LandingScreen = () => {
    const [visibleComp,setVisibleComp] = useState(false);
    function toggleVisibleComp() {
        setVisibleComp(!visibleComp);
    }
    return (
      <div id = "screen-container">
        <div id="signup-component" >
            <SignupComponent />
        </div>
        <div id="signup-component-mobile" className={visibleComp?'visible-signup' : 'invisible-signup'}>
            <SignupComponent closeComp={toggleVisibleComp}/>
        </div>
        <div id="overlay" onClick={toggleVisibleComp} className={visibleComp?'visible-overlay' : 'invisible-overlay'}></div>
        <div id="bg-1"></div>
        <div id="bg-2"></div>
        <div style={{width : "100%"}}>
            <div id="ieee-logo">
                <img src={ieee_vit_logo} />
            </div>
            <div id="page-content">
                <h1 id="page-content-heading">Core Committee Selection</h1>
                <h1 style={{color : "#0088FF"}} >2020-2021</h1>
                <h3>Do you have what it takes to be in this chapter of great minds...lol</h3>
            </div>
        </div>
        <div id="register-btn" onClick={toggleVisibleComp}>Register Now</div>
        <div id="social-media-handles"> 
            <a href="https://ieeevit.org/"><img id="first-social-media-handle" src={web_logo} /></a>
            <a href="https://twitter.com/ieeevitvellore" ><img src={twitter_logo} /></a>
            <a href="https://www.instagram.com/ieeevitvellore/" ><img src={insta_logo} /></a>
        </div>
      </div>
  );
}

export default LandingScreen;