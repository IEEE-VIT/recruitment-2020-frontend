import React, { useEffect } from "react";
import "./ChooseSlot.css";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
const ChooseSlot = ({
  dateSelected,
  setDateSelected,
  chooseSlot,
  setChooseSlot,
  onSubmitFunct,
  slots,
  chosenSlot,
  setChosenSlot,
  slotSubmit,
  notMoreThanOneSlot,
  loadingSlotSubmit,
}) => {
  useEffect(() => {
    // console.log(slots, dateSelected);
  }, [slots, dateSelected]);
  function changeSlot(filled, suid) {
    if (!filled) {
      if (chosenSlot === "") {
        setChosenSlot(suid.toString());
      } else {
        if (chosenSlot === suid.toString()) {
          setChosenSlot("");
        } else {
          notMoreThanOneSlot();
        }
      }
    }
  }
  return (
    <div
      id="choose-slot"
      className={chooseSlot ? "visible-comp" : "invisible-comp"}
    >
      <div id="choose-slot-header">
        <h4>Choose your slot</h4>
      </div>
      <div id="choose-slot-body">
        <h4>Note that once a slot is chosen, it can not be changed later</h4>
        <h4>DATE</h4>
        <div id="choose-slot-date">
          {dateSelected !== "" && Object.keys(slots)[0] !== ""
            ? Object.keys(slots).map((data) => {
                return (
                  <div
                    className={
                      data === dateSelected
                        ? "date-btn slot-btn-selected"
                        : "date-btn"
                    }
                    onClick={() => setDateSelected(data)}
                  >
                    {data}
                  </div>
                );
              })
            : null}
        </div>
        <h4>TIME</h4>
        <div id="choose-slot-time">
          {dateSelected !== "" && Object.keys(slots)[0] !== ""
            ? slots[dateSelected].map((data) => {
                return (
                  <div
                    className={
                      data.filled
                        ? "time-btn disabled-btn"
                        : data.suid.toString() === chosenSlot
                        ? "time-btn slot-btn-selected"
                        : "time-btn"
                    }
                    onClick={() => changeSlot(data.filled, data.suid)}
                  >
                    {" "}
                    {data.timeFrom}-{data.timeTo}{" "}
                  </div>
                );
              })
            : null}
        </div>
        <div id="slot-confirm-btn" onClick={() => slotSubmit()}>
          {loadingSlotSubmit ? <LoadingIndicator /> : "CONFIRM SLOT"}
        </div>
      </div>
    </div>
  );
};

export default ChooseSlot;
