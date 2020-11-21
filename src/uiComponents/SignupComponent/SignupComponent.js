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
    const [name,setName] = useState("") ;
    const [email,setEmail] = useState("") ;
    const [pass,setPass] = useState("") ;
    const [showPass, setShowPass] = useState(false);
    const [confirmPass,setConfirmPass] = useState("") ;
    const [signUpIndicator,setSignUpIndicator] = useState(true);
    const [logInIndicator,setLogInIndicator] = useState(false);
    function toggleIndicators() {
        setSignUpIndicator(!signUpIndicator);
        setLogInIndicator(!logInIndicator);
    }
    function toggleShowPass() {
       setShowPass(!showPass);
    }
    function handleSubmit() {
        console.log("SUBMIT!");
    }
    return <div>
        <div id= {logInIndicator?"login-container":"signup-container"}>
            <div id="close-icon" onClick={props.closeComp}>
                <CloseIcon />
            </div>
            <div id="signup-header">
                <h4 className={signUpIndicator?'thisison':'thisisoff'} onClick={()=>{if(!signUpIndicator) {toggleIndicators()}}}>Signup</h4>
                <h4 style={{paddingBottom:"1vh"}}>|</h4>
                <h4 className={logInIndicator?'thisison':'thisisoff'} onClick={()=>{if(!logInIndicator) {toggleIndicators()}}}>Login</h4>
            </div>
            <div className = {logInIndicator?"disappear" :"signup-elements"}>
                <TextField style={{width:"100%"}} id="outlined-basic" type="text" value={name} label="Name" onChange={(newName)=>{setName(newName.target.value)}}/>
            </div>
            <div className = "signup-elements">
               <TextField style={{width:"100%"}} id="outlined-basic" type="email" value={email} label="Email ID" onChange={(newEmail)=>{setEmail(newEmail.target.value)}}/>
            </div>
            <div className = "signup-elements">
            <TextField style={{width:"100%"}}  id="outlined-basic" type={showPass?'text':'password'} value={pass} label="Password" onChange={(newPass)=>{setPass(newPass.target.value)}} 
               InputProps= {{
                endAdornment : (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPass}
                  onMouseDown={()=>{console.log("handlemousedownstuff")}}
                >
                  {showPass ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment> )
               }}
            />
            </div>
            <div className = {logInIndicator?"disappear" :"signup-elements"}>
                 <TextField style={{width:"100%"}}  id="outlined-basic" type="password" value={confirmPass} label="Confirm Password" onChange={(newConfirmPass)=>{setConfirmPass(newConfirmPass.target.value)}}/>
            </div>
            <div id="submit-button" onClick = {()=> handleSubmit()}>Submit</div>
        </div>
    </div> 
}

export default SignupComponent;