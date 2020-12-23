import React from "react";
import "./FormComponent3.css";

const FormComponent3 = ({ compno, question, mandatory, phNo, setPhNo }) => {
  return (
    <div id="comp3-container">
      <h3>
        {compno + ". " + question + " "}
        <span
          className={mandatory ? "comp3-visible-comp" : "invisible-comp"}
          style={{ color: "red" }}
        >
          *
        </span>
      </h3>
      <input
        type="text"
        value={phNo}
        placeholder="Your Phone Number"
        onChange={(newPhNo) => setPhNo(newPhNo.target.value)}
        className="form-comp-input-field"
      />
    </div>
  );
};

export default FormComponent3;
