import React from "react";
import ieee_vit_logo from "../../assets/ieee_vit_logo.svg";
import "./TeamResults.css";

const TeamResults = () => {
  const selectedPeeps = [
    "Prarthana Saikia",
    "Ritwik Goel",
    "Aarush Bhat",
    "Ashikka Gupta",
    "Shubham Palriwala",
    "Pracheta Mohanty",
    "Malavika Rajesh",
    "V kartik",
    "Aastha Singh",
    "Divya reddy",
    "Antra Nakhasi",
    "Yash Surya",
    "Harsh Singhal",
    "Shruti Jain",
    "Ankur Jyoti Dutta",
    "Rohan Arora",
    "Khushboo Kanwar Rajawat",
    "Yash Kumar Verma",
    "Aryan Shridhar",
    "Khyati Gupta",
    "Srishti Lodha",
    "Poornesh Adhithya",
    "Shriyashish Mishra",
    "Archisman Hota",
    "Ishan Dhruv",
    "Ishan Khandelwal",
    "Hemanth",
    "Niyantha",
    "Aaryan kothari",
    "K Shakthi Dhar Reddy",
    "Dev Shankar Paul",
    "Harshul Chandrashekar",
    "ADI asija",
    "Guru Athavan",
    "Akshunn Trivedi",
    "Harsh",
    "Souris Ash",
    "Soham Mittal",
    "Ansh Sharma",
    "Rahul Agarwal",
    "Agniva Basak",
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
