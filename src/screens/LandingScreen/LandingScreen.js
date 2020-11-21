import React from 'react';
import './landingScreen.css';
import ieee_vit_logo from '../../assets/ieee_vit_logo.png';
import web_logo from '../../assets/web_logo.png';
import twitter_logo from '../../assets/twitter_logo.png';
import insta_logo from '../../assets/insta_logo.png';

import SignupComponent from '../../uiComponents/SignupComponent/SignupComponent';
const LandingScreen = () => {
  return (
      <div id = "screen-container">
        <div id="signup-component" >
            <SignupComponent/>
        </div>
        <div id="bg-1"></div>
        <div id="bg-2"></div>
        <div>
            <div id="ieee-logo">
                <img src={ieee_vit_logo} />
            </div>
            <div id="page-content">
                <h1 id="page-content-heading">Core Committee Selection</h1>
                <h1 style={{color : "#0088FF"}} >2020-2021</h1>
                <h3>Do you have what it takes to be in this chapter of great minds...lol</h3>
            </div>
        </div>
        <div id="social-media-handles"> 
            <img id="first-social-media-handle" src={web_logo} />
            <img src={twitter_logo} />
            <img src={insta_logo} />
        </div>
      </div>
  );
}

export default LandingScreen;