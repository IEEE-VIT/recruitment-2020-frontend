import React,{useState} from 'react';
import './RoundDetails.css';
import InactiveClock from '../../assets/inactive-clock.png';
import lock from '../../assets/lock.png';
import check from '../../assets/check.png';
import CloseIcon from '@material-ui/icons/Close';
function RoundDetails(props) {
    const [ready,setReady] = useState(false);
    const [chooseSlot,setChooseSlot] = useState(false);
    return <div id="round-details-container">
        <div id="overlay" className={ready||chooseSlot?'visible-comp':'invisible-comp'} onClick={()=>{setReady(false);setChooseSlot(false);}}></div>
        <div id="interview-ready" className={ready?'visible-comp':'invisible-comp'} >
            <div id="interview-ready-header">
                <h5>Interview</h5>
                <CloseIcon id="close-icon" onClick={()=>setReady(false)}/>
            </div>
            <div id="interview-ready-body">
                <p>Great. You’ll receive an email shortly, keep checking your inbox for the meeting link. You can not give an interview if your slot has passed</p>
            </div>
        </div>
        <div id="choose-slot"  className={chooseSlot?'visible-comp':'invisible-comp'} >
            <div id="choose-slot-header">
                <h4>Choose your slot</h4>
                <CloseIcon id="close-icon" onClick={()=>setChooseSlot(false)}/>
            </div>
            <div id="choose-slot-body">
                <h4>Note that once a slot is chosen, it can not be changed later</h4>
                <h4>DATE</h4>
                <div id="choose-slot-date">
                    <div className="date-btn"> 8th DEC </div>
                    <div className="date-btn"> 9th DEC </div>
                    <div className="date-btn"> 10th DEC </div>
                </div>
                <h4>TIME</h4>
                <div id="choose-slot-time">
                    <div className="time-btn"> 11-11:30 </div>
                    <div className="time-btn"> 11:30-12 </div>
                    <div className="time-btn"> 12-12:30 </div>
                    <div className="time-btn"> 11-11:30 </div>
                    <div className="time-btn"> 11:30-12 </div>
                    <div className="time-btn"> 12-12:30 </div>
                    <div className="time-btn"> 11-11:30 </div>
                    <div className="time-btn"> 11:30-12 </div>
                    <div className="time-btn"> 12-12:30 </div>
                </div>
                <div id="confirm-btn">CONFIRM SLOT</div>
            </div>
        </div>
        <div id="round-details-header">
            <h3>Round {props.roundno} {props.domain!==""?"("+props.domain+")" : ""} </h3>
        </div>
        <div id="round-details-body" className={props.elligible && !props.qualified?'visible-comp':'invisible-comp'}>
                <div id="slot-selection" className={!props.scheduled?'visible-comp':'invisible-comp'}>
                    <img src={InactiveClock} />
                    <h4 onClick={()=>setChooseSlot(!chooseSlot)}>CHOOSE SLOT</h4>
                </div>
                <div id="slot-display" className={props.scheduled?'visible-comp':'invisible-comp'}>
                    <div>
                        <h5>INTERVIEW</h5>
                        <h5>{props.date}, {props.start_time}-{props.end_time}</h5>
                        <h5>Kindly visit the portal during your slot</h5>
                    </div>
                    <div>
                        <h4 onClick={()=>setReady(!ready)}>I'M READY NOW</h4>
                    </div>
                </div>
        </div>
        <div id="round-details-body_cleared" className={props.elligible && props.qualified?'visible-comp':'invisible-comp'}>
            <img src={check} />
            <h4>Cleared</h4>
        </div>
        <div id="round-details-body_locked" className={!props.elligible?'visible-comp':'invisible-comp'}>
            <img src={lock} />
            <h4>LOCKED</h4>
        </div>
    </div>
}

export default RoundDetails;