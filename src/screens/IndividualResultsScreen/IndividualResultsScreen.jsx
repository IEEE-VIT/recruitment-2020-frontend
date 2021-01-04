import React,{useState} from "react";
import "./IndividualResultsScreen.css";
import ieee_vit_logo from "../../assets/ieee_vit_logo.svg";
import TeamResults from "../TeamResults/TeamResults.jsx";

const IndividualResultsScreen =(props)=>{
    const [redirect,setRedirect] = useState(false);
    if(redirect){
        return <TeamResults />
    }
    return <div id="individual-results-container">
        <div id="individual-results-content">
            <a href="https://ieeevit.org" target="_blank" rel="noreferrer noopener">
                <img src={ieee_vit_logo} alt="logo" id="ind-results-ieee-logo" />
            </a>
            <div id="individual-selected">
                <h1>{props.props.selected?"You're in!":"Sorry, You couldn't make the cut :("}</h1>
                <h2>{props.props.selected?"Welcome to the legacy":"But your journey is not over"}</h2>
            </div>
            <div id="ind-results-redirect-btn" onClick={()=>{setRedirect(true)}}>{props.props.selected?"Meet your team":"Look who got in!"}</div>
        </div>
        </div>
};

export default IndividualResultsScreen;