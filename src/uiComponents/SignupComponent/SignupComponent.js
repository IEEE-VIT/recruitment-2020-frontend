import React,{useState} from 'react';
import './SignupComponent.css';
import {TextField} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

function SignupComponent() {
    const [name,setName] = useState("") ;
    const [email,setEmail] = useState("") ;
    const [pass,setPass] = useState("") ;
    const [showPass, setShowPass] = useState(false);
    const [confirmPass,setConfirmPass] = useState("") ;
    function toggleShowPass() {
       setShowPass(!showPass);
    }
    function handleSubmit() {
        console.log("SUBMIT!");
    }
    return <div>
        <div id="signup-container">
            <div id="signup-header">
                <h4>Signup</h4>
                <h4>|</h4>
                <h4>Login</h4>
            </div>
            <TextField className = "signup-elements" id="outlined-basic" type="text" value={name} label="Name" onChange={(newName)=>{setName(newName.target.value)}}/>
            <TextField className = "signup-elements" id="outlined-basic" type="email" value={email} label="Email ID" onChange={(newEmail)=>{setEmail(newEmail.target.value)}}/>
            <TextField className = "signup-elements" id="outlined-basic" type={showPass?'text':'password'} value={pass} label="Password" onChange={(newPass)=>{setPass(newPass.target.value)}} 
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
            <TextField className = "signup-elements" id="outlined-basic" type="password" value={confirmPass} label="Confirm Password" onChange={(newConfirmPass)=>{setConfirmPass(newConfirmPass.target.value)}}/>
            <div id="submit-button" onClick = {()=> handleSubmit()}>Submit</div>
        </div>
    </div> 
}

export default SignupComponent;