import React, { useState } from "react";
import "./RoundDetails.css";
import InactiveClock from "../../assets/inactive-clock.png";
import lock from "../../assets/lock.svg";
import check from "../../assets/check.png";
import CloseIcon from "@material-ui/icons/Close";
import ChooseSlot from "../ChooseSlot/ChooseSlot";
import { toastError } from "../../utils/userHelperFuncs";

const RoundDetails = (props) => {
  const [ready, setReady] = useState(false);
  const [chooseSlot, setChooseSlot] = useState(false);
  const [slots] = useState({ "": [{ timeTo: "", timeFrom: "" }] });
  const [dateSelected, setDateSelected] = useState("");
  const [chosenSlot, setChosenSlot] = useState("");
  function slotSubmit() {
    if (chosenSlot === "") {
      toastError("Please select a slot!");
    } else {
    }
  }
  function notMoreThanOneSlot() {
    toastError("You can't select more than one slot!");
  }
  return (
    <div id="round-details-container">
      <div
        id="overlay"
        className={ready || chooseSlot ? "visible-comp" : "invisible-comp"}
        onClick={() => {
          setReady(false);
          setChooseSlot(false);
        }}
      ></div>
      <div
        id="interview-ready"
        className={ready ? "visible-comp" : "invisible-comp"}
      >
        <div id="interview-ready-header">
          <h5>Interview</h5>
          <CloseIcon id="close-icon" onClick={() => setReady(false)} />
        </div>
        <div id="interview-ready-body">
          <p>
            Great. You’ll receive an email shortly, keep checking your inbox for
            the meeting link. You can not give an interview if your slot has
            passed
          </p>
        </div>
      </div>
      <ChooseSlot
        dateSelected={dateSelected}
        setDateSelected={(date) => setDateSelected(date)}
        notMoreThanOneSlot={() => notMoreThanOneSlot()}
        slots={slots}
        slotSubmit={() => slotSubmit()}
        chosenSlot={chosenSlot}
        setChosenSlot={setChosenSlot}
        chooseSlot={chooseSlot}
        setChooseSlot={(slot) => setChooseSlot(slot)}
      />
      <div id="round-details-header">
        <h3>
          Round {props.roundno}{" "}
          {props.domain !== "" ? "(" + props.domain + ")" : ""}{" "}
        </h3>
      </div>
      <div
        id="round-details-body"
        className={
          props.elligible && !props.qualified
            ? "visible-comp"
            : "invisible-comp"
        }
      >
        <div
          id="slot-selection"
          className={!props.scheduled ? "visible-comp" : "invisible-comp"}
        >
          <img src={InactiveClock} alt="inactive clock" />
          <h4 onClick={() => setChooseSlot(!chooseSlot)}>CHOOSE SLOT</h4>
        </div>
        <div
          id="slot-display"
          className={props.scheduled ? "visible-comp" : "invisible-comp"}
        >
          <div>
            <h5>INTERVIEW</h5>
            <h5>
              {props.date}, {props.start_time}-{props.end_time}
            </h5>
            <h5>Kindly visit the portal during your slot</h5>
          </div>
          <div>
            <h4 onClick={() => setReady(!ready)}>I'M READY NOW</h4>
          </div>
        </div>
      </div>
      <div
        id="round-details-body_cleared"
        className={
          props.elligible && props.qualified ? "visible-comp" : "invisible-comp"
        }
      >
        <img src={check} alt="check" />
        <h4>Cleared</h4>
      </div>
      <div
        id="round-details-body_locked"
        className={!props.elligible ? "visible-comp" : "invisible-comp"}
      >
        <img src={lock} alt="lock" />
        <h4>LOCKED</h4>
      </div>
      {!props.pendingReview ? null : (
        <div id="round-details-body_locked">
          <img src={lock} alt="lock" />
          <h4>In review</h4>
        </div>
      )}
    </div>
  );
};

export default RoundDetails;
