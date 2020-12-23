import React, { useEffect, useState } from "react";
import "./FormComponent4.css";

const FormComponent4 = ({
  quid,
  compno,
  counter,
  question,
  mandatory,
  answers,
  setAnswers,
}) => {
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i]["quid"].toString() === quid.toString()) {
        setAnswer(answers[i]["answer"]);
        break;
      }
    }
    // eslint-disable-next-line
  }, [counter]);
  const changeAnswer = (newAns) => {
    setAnswer(newAns);
    const anss = answers.map((data) => {
      if (data["quid"].toString() === quid.toString()) {
        return {
          quid: quid.toString(),
          answer: newAns,
        };
      } else {
        return data;
      }
    });
    setAnswers(anss);
  };
  return (
    <div id="comp4-container">
      <h3>
        {compno + ". " + question + " "}
        <span
          className={mandatory ? "comp4-visible-comp" : "invisible-comp"}
          style={{ color: "red" }}
        >
          *
        </span>
      </h3>
      <input
        type="text"
        value={answer}
        placeholder="Your answer"
        onChange={(newAns) => changeAnswer(newAns.target.value)}
        className="form-comp-input-field"
      />
    </div>
  );
};

export default FormComponent4;
