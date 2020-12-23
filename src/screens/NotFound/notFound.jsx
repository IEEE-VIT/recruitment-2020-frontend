import "./notFound.css";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
// import { NotificationsOffRounded } from "@material-ui/icons";

const NotFound = () => {
  const [goToHome, setGoToHome] = useState(false);
  return (
    <div id="not-found-container">
      <div id="not-found-content">
        <h1>404</h1>
        <h3>Page not found</h3>
        <h5>There is just one way to get in and it is not this one</h5>
        <div
          id="home-btn"
          onClick={() => {
            setGoToHome(true);
          }}
        >
          HOME
        </div>
      </div>
      <div id="not-found-footer" />
      {goToHome ? <Redirect push to="/" /> : null}
    </div>
  );
};

export default NotFound;
