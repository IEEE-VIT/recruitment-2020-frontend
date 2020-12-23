import React from "react";
import "./FormComponent1.css";

const FormComponent1 = ({ name, setName }) => {
  return (
    <div id="comp1-container">
      <h1>Hey there!</h1>
      <h5>Let us get started by knowing more about you </h5>
      <h3>
        1. What name would we call you by once you become a part of this chapter
        :{")"} ?<span style={{ color: "red" }}>*</span>
      </h3>
      <input
        type="text"
        value={name}
        placeholder="Your Full Name"
        onChange={(newName) => setName(newName.target.value)}
        className="form-comp-input-field"
      />
    </div>
  );
};

export default FormComponent1;
