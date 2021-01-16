import React from "react";
import ieee_vit_logo from "../../assets/ieee_vit_logo.svg";
import "./TeamResults.css";

const TeamResults = () => {
  const selectedPeeps = [
    "Archisa",
"Abhishek",
"Ananya",
"Gauri Gupta",
"Aneesh Panda",
"Nimisha Sara",
"Vikhyat",
"Varun Murpani",
"Shubhangi Tiwari",
"Sidarth",
"Vibhuti Arora",
"Pranav Sathish",
"Pramika",
"Kavipriya",
"Astha Jha",
"Vishesh Goyal",
"Prashasti",
"Kadambari Chikara",
"Goutham Sajeeth",
"Maulik Bahri",
"Alok",
"Mayank Sharma",
"Himanshu Shah",
"Jassim Mohammed Shamim",
"Rishabh Agrawal",
"Avyay",
"Yajat Malhotra",
"Mannan Goyal",
"Jatin Fulwani",
"Anshita Bala",
"Shriram",
"Sourish Gupta",
"Anshul Agarwala",
"Archita Todi",
"Harsh Gupta",
"Abhiram V Joshi", 
"Amogh Arya",
"Krish Chatterjie",
"Akshaya",
"Pratham Jain",
"Additya Singhal"
  ];
  console.log(selectedPeeps.length);
  return (
    <div id="team-results-container">
      <div id="team-results-content">
        <a href="https://ieeevit.org" target="_blank" rel="noreferrer noopener">
          <img src={ieee_vit_logo} alt="logo" id="team-results-ieee-logo" />
        </a>
        <h1>Core Committee 2020-2021</h1>
        <div id="team-names">
          {selectedPeeps.map((data, index) => {
            if (index !== selectedPeeps.length - 1)
              return <p key={index}>{data}, </p>;
            else return <p key={index}>{data}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamResults;
