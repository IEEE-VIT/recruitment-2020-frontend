import React,{useState} from 'react' ;
import ieee_vit_logo from '../../assets/ieee_vit_logo.png';
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
    function incrCounter() {
        setCounter(counter+1);
    }
    function decrCounter() {
        setCounter(counter-1);
    }
    return <div id="screen-container">
        <div id="header">
            <img src={ieee_vit_logo} />
            <div id="logout-btn">Logout</div>
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
                <div id="submit-btn" className={counter!==5?'disabled-comp' : 'dummy-class'}>
                    Submit
                </div>
                <div id="page-arrows">
                    <div id="icon-up" className={counter===5?'disabled-arrow':'dummy-class'} onClick={incrCounter}>
                        <KeyboardArrowUpIcon id="icon-size"/>
                    </div>  
                    <div id="icon-down" className={counter===1?'disabled-arrow':'dummy-class'} onClick={decrCounter} style={{marginRight:0}}>
                        <KeyboardArrowDownIcon id="icon-size" />
                    </div>
                </div>
            </div>
            <div id="completion-indicator" style={{width : 20*counter + 'vw'}}></div>
        </div>
    </div>
}

export default FormScreen;