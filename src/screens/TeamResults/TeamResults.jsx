import React from "react";
import ieee_vit_logo from "../../assets/ieee_vit_logo.svg";
import "./TeamResults.css";

const TeamResults =()=>{
    const selectedPeeps = ["RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName",
    "RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName",
    "RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","Shubham Noob EasterEgg","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName",
    "RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName","RandomGuy LastName","RandomGirl LastName"];
    console.log(selectedPeeps.length);
    return <div id="team-results-container">
        <div id="team-results-content">
            <a href="https://ieeevit.org" target="_blank" rel="noreferrer noopener">
                <img src={ieee_vit_logo} alt="logo" id="team-results-ieee-logo" />
            </a>
            <h1>Core Committee 2020-2021</h1>
            <div id="team-names">
            {
                selectedPeeps.map((data,index)=>{
                    if(index!==selectedPeeps.length -1)
                        return <p>{data} | </p>
                    else 
                        return <p>{data}</p>    
                })
            }
            </div>
        </div>
        </div>
};

export default TeamResults ;