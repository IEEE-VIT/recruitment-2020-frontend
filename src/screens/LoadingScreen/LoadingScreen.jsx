import "./LoadingScreen.css";
import React from "react";

const LoadingScreen = () => {
  return (
    <div id="loading-screen-container">
      <div className="sk-chase sk-center">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
