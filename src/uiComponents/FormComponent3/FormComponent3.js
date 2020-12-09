import React from 'react';
import './FormComponent3.css'; 
function FormComponent3 (props) {
    var question = "";
    if(props.compno===3) {
        question = "3. Which is your favorite app and how can you improve it?";
    }
    else if(props.compno ===4)
    {
        question = "4. Are you a cat person or a dog person ? ";
    }
    else if(props.compno ===5)
    {
        question = "5. Why should we recruit a noob like you to this chapter?";
    }
    return <div id="comp3-container">
        <h3>{question}<span style={{color:"red"}}>*</span></h3>
        <div id="comp3-inp"></div>
    </div>
}

export default FormComponent3 ;