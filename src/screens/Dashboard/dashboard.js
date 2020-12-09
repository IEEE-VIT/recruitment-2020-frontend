import React from 'react';
import RoundDetails from '../../uiComponents/RoundDetails/RoundDetails';
import './dashboard.css';
function Dashboard () {
    return <div id="dashboard-container">
        <div id="dashboard-header">
            <div id="logout-btn">Logout</div>
        </div>
        <div id="dashboard-body">
            <div id="dashboard-welcome-message">
                <h1>Hi Louis ,</h1>
                <p>Here is the roadmap for IEEE VIT’s core committee selections. Make sure to keep an eye on your progress regularly.</p>
            </div>
            <div id="round-details">
                <RoundDetails roundno={1} elligible={true} qualified={true} scheduled={false} domain={""}/>
                <RoundDetails roundno={2} elligible={true} scheduled={false} domain={"Management"}/>
                <RoundDetails roundno={2} elligible={true} scheduled={true} date={"9th Dec"} start_time={"11"} end_time={"11:30"} domain={"Tech"}/>
                <RoundDetails roundno={3} elligible={false} scheduled={false} domain={""}/>
            </div>
        </div>
    </div>
}

export default Dashboard ;