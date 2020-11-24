import React from 'react';
import './FormComponent1.css'; 
import { useState } from 'react';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
function FormComponent1 (props) {
    const name = "Anshika" ;
    return <div id="comp1-container">
        <h1>Hi <span style={{color: "#0088FF"}}>{name},</span></h1>
        <h5>Let us get started by knowing more about you </h5>
        <h3>1. Tell us your Registration number.<span style={{color:"red"}}>*</span></h3>
        <div id="comp1-input"></div>
    </div>
}

export default FormComponent1 ;