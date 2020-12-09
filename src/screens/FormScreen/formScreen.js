import React,{useState} from 'react' ;
import ieee_vit_logo from '../../assets/ieee_vit_logo.png';
import success from '../../assets/success.png';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import FormComponent1 from '../../uiComponents/FormComponent1/FormComponent1';
import FormComponent2 from '../../uiComponents/FormComponent2/FormComponent2';
import FormComponent3 from '../../uiComponents/FormComponent3/FormComponent3';
import './formScreen.css';

function FormScreen() {
    const [counter,setCounter] = useState(1);
    const [regNo,setRegNo] = useState("hellothere");
    const [domains,setDomains] = useState([]);
    const [showConfirmation,setShowConfirmation] = useState(false);
    const [showConfirmed,setShowConfirmed] = useState(false);
    function incrCounter() {
        setCounter(counter+1);
    }
    function decrCounter() {
        setCounter(counter-1);
    }
    return <div id="form-screen-container">
        <div id="overlay" className={showConfirmation?'visible-comp':'invisible-comp'} onClick={()=>{!showConfirmed?setShowConfirmation(false):console.log("donothing")}}></div>
        <div id="confirmation-screen" className={showConfirmation && !showConfirmed?'visible-comp':'invisible-comp'}>
            <h2>Are you sure you want to submit ?</h2>
            <div id="confirmation-btns">
                <h4 onClick={()=>setShowConfirmation(false)}>Take me back</h4>
                <div onClick={()=>setShowConfirmed(true)}>Yes, submit my form</div>
            </div>
        </div>
        <div id="confirmed-screen" className={showConfirmation && showConfirmed?'visible-comp':'invisible-comp'}>
            <img src={success} />
            <h2>Your form has been submitted successfully</h2>
            <h4>You will be redirected to <span style={{color :"#0088FF"}}>dashboard</span> in 5 secs...</h4>
        </div>
        <div id="header">
            <img src={ieee_vit_logo} />
            <div id="form-logout-btn">Logout</div>
        </div>
        <div id="form-components">
            <div className={counter===1?'visible-comp':'invisible-comp'}>
                <FormComponent1 regNo={regNo} setRegNo={(newRegNo)=>setRegNo(newRegNo)} />
            </div>
            <div className={counter===2?'visible-comp':'invisible-comp'}>
                <FormComponent2 domains={domains} setDomains={(domain)=>{setDomains(domain)}}/>
            </div>
            <div className={counter===3?'visible-comp':'invisible-comp'}>
                <FormComponent3 compno={3} />
            </div>
            <div className={counter===4?'visible-comp':'invisible-comp'}>
                <FormComponent3 compno={4} />
            </div>
            <div className={counter===5?'visible-comp':'invisible-comp'}>
                <FormComponent3 compno={5}/>
            </div>
        </div>
        <div id ="footer">
            <div id="footer-content">
                <div id="submit-btn" onClick={()=>setShowConfirmation(true)} className={counter!==5?'disabled-comp' : 'dummy-class'}>
                    Submit
                </div>
                <div id="page-arrows">
                    <div id="icon-up" className={counter===1?'disabled-arrow':'dummy-class'} onClick={decrCounter}>
                        <KeyboardArrowUpIcon id="icon-size"/>
                    </div>  
                    <div id="icon-down" className={counter===5?'disabled-arrow':'dummy-class'} onClick={incrCounter}>
                        <KeyboardArrowDownIcon id="icon-size" />
                    </div>
                </div>
            </div>
            <div id="completion-indicator" style={{width : 20*counter + 'vw'}}></div>
        </div>
    </div>
}

export default FormScreen;