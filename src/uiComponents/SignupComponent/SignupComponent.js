import React,{useState} from 'react';
import './SignupComponent.css';
import {TextField} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

function SignupComponent(props) {
    function toggleIndicators() {
        props.setSignUpIndicator(!props.signUpIndicator);
        props.setLogInIndicator(!props.logInIndicator);
    }
    function toggleShowPass() {
       props.setShowPass(!props.showPass);
    }
    function handleSubmit() {
        console.log("SUBMIT!");
        props.signUpUser();
    }
    return <div className="signup-login-container">
        <div id= {props.logInIndicator?"login-container":"signup-container"}>
            <div id="close-icon" onClick={props.closeComp}>
                <CloseIcon />
            </div>
            <div id="signup-header">
                <h4 className={props.signUpIndicator?'thisison':'thisisoff'} onClick={()=>{if(!props.signUpIndicator) {toggleIndicators()}}}>Signup</h4>
                <h4 style={{paddingBottom:"1vh"}}>|</h4>
                <h4 className={props.logInIndicator?'thisison':'thisisoff'} onClick={()=>{if(!props.logInIndicator) {toggleIndicators()}}}>Login</h4>
            </div>
            <div className = {props.logInIndicator?"disappear" :"signup-elements"}>
                <TextField style={{width:"100%"}} id="outlined-basic" type="text" value={props.name} label="Name" onChange={(newName)=>{props.setName(newName.target.value)}}/>
            </div>
            <div className = "signup-elements">
               <TextField style={{width:"100%"}} id="outlined-basic" type="email" value={props.email} label="Email ID" onChange={(newEmail)=>{props.setEmail(newEmail.target.value)}}/>
            </div>
            <div className = "signup-elements">
            <TextField style={{width:"100%"}}  id="outlined-basic" type={props.showPass?'text':'password'} value={props.pass} label="Password" onChange={(newPass)=>{props.setPass(newPass.target.value)}} 
               InputProps= {{
                endAdornment : (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPass}
                  onMouseDown={()=>{console.log("handlemousedownstuff")}}
                >
                  {props.showPass ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment> )
               }}
            />
            </div>
            <div className = {props.logInIndicator?"disappear" :"signup-elements"}>
                 <TextField style={{width:"100%"}}  id="outlined-basic" type="password" value={props.confirmPass} label="Confirm Password" onChange={(newConfirmPass)=>{props.setConfirmPass(newConfirmPass.target.value)}}/>
            </div>
            <div id="submit-button" onClick = {()=> handleSubmit()}>Submit</div>
            <div className={props.signUpIndicator?'disappear':'dummy-class'} id="forgot-password">Forgot Password? <span style={{color : "#0088FF",textDecoration:"underline"}}>Reset now</span></div>
        </div>
    </div> 
}

export default SignupComponent;