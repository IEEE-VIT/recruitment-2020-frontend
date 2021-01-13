import "./ThankyouScreen.css";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
// import { NotificationsOffRounded } from "@material-ui/icons";

const Thankyou = () => {
  return (
    <div id="thankyou-container">
      <div id="thankyou-content">
        <h1>Thanks for participating in our recruitment.</h1>
        <h5>Results will be announced soon!</h5>
      </div>
      <div id="thankyou-footer" />
    </div>
  );
};

export default Thankyou;
