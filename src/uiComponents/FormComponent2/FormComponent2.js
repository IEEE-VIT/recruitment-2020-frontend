import React,{useState} from 'react';
import './FormComponent2.css'; 
function FormComponent2 (props) {
    const [classNames,setClassNames] = useState(["domain-container","domain-container","domain-container","domain-container","domain-container","domain-container","domain-container","domain-container","domain-container"]);
    const [error,setError] = useState("");
    function addDomain(domain) {
        setError("");
         if(props.domains.includes(domain)){
                props.setDomains(props.domains.filter((item)=>{ return item!==domain}));
                switch(domain) {
                    case 'Management' : setClassNames(classNames.map((item,index)=>{if(index===0) {return "domain-container"} else {return item}})); 
                                        break;
                    case 'Web Development' : setClassNames(classNames.map((item,index)=>{if(index===1) {return "domain-container"} else {return item}})); 
                                        break;
                    case 'Machine Learning' : setClassNames(classNames.map((item,index)=>{if(index===2) {return "domain-container"} else {return item}})); 
                                        break;
                    case 'App Development' : setClassNames(classNames.map((item,index)=>{if(index===3) {return "domain-container"} else {return item}})); 
                                        break;
                    case 'UI/UX Design' : setClassNames(classNames.map((item,index)=>{if(index===4) {return "domain-container"} else {return item}})); 
                                        break;
                    case 'Competitive Coding' : setClassNames(classNames.map((item,index)=>{if(index===5) {return "domain-container"} else {return item}})); 
                                        break;
                    case 'Cyber Security' : setClassNames(classNames.map((item,index)=>{if(index===6) {return "domain-container"} else {return item}})); 
                                        break;
                    case 'Electronics' : setClassNames(classNames.map((item,index)=>{if(index===7) {return "domain-container"} else {return item}})); 
                                        break;
                    case 'Video Editing / VFX' : setClassNames(classNames.map((item,index)=>{if(index===8) {return "domain-container"} else {return item}})); 
                                        break;
                }
         }
        else {
            if(props.domains.length ===2){
                setError("*You can't select more than 2 domains.")
            }
            else {
                props.setDomains([...props.domains,domain]);
                switch(domain) {
                    case 'Management' : setClassNames(classNames.map((item,index)=>{if(index===0) {return "domain-container selected-domain"} else {return item}})); 
                                        break;
                    case 'Web Development' : setClassNames(classNames.map((item,index)=>{if(index===1) {return "domain-container selected-domain"} else {return item}})); 
                                        break;
                    case 'Machine Learning' : setClassNames(classNames.map((item,index)=>{if(index===2) {return "domain-container selected-domain"} else {return item}})); 
                                        break;
                    case 'App Development' : setClassNames(classNames.map((item,index)=>{if(index===3) {return "domain-container selected-domain"} else {return item}})); 
                                        break;
                    case 'UI/UX Design' : setClassNames(classNames.map((item,index)=>{if(index===4) {return "domain-container selected-domain"} else {return item}})); 
                                        break;
                    case 'Competitive Coding' : setClassNames(classNames.map((item,index)=>{if(index===5) {return "domain-container selected-domain"} else {return item}})); 
                                        break;
                    case 'Cyber Security' : setClassNames(classNames.map((item,index)=>{if(index===6) {return "domain-container selected-domain"} else {return item}})); 
                                        break;
                    case 'Electronics' : setClassNames(classNames.map((item,index)=>{if(index===7) {return "domain-container selected-domain"} else {return item}})); 
                                        break;
                    case 'Video Editing / VFX' : setClassNames(classNames.map((item,index)=>{if(index===8) {return "domain-container selected-domain"} else {return item}})); 
                                        break;
                }
            }
        }
    }
    return <div id="comp2-container">
        <h3>2. Choose your preferred domains.<span style={{color:"red"}}>*</span></h3>
        <div id="domains-container">
            <div className={classNames[0]} onClick={()=>{addDomain('Management')}}>Management</div>
            <div className={classNames[1]} onClick={()=>{addDomain('Web Development')}}>Web Development</div>
            <div className={classNames[2]} onClick={()=>{addDomain('Machine Learning')}}>Machine Learning</div>
            <div className={classNames[3]} onClick={()=>{addDomain('App Development')}}>App Development</div>
            <div className={classNames[4]} onClick={()=>{addDomain('UI/UX Design')}}>UI/UX Design</div>
            <div className={classNames[5]} onClick={()=>{addDomain('Competitive Coding')}}>Competitive Coding</div>
            <div className={classNames[6]} onClick={()=>{addDomain('Cyber Security')}}>Cyber Security</div>
            <div className={classNames[7]} onClick={()=>{addDomain('Electronics')}}>Electronics</div>
            <div className={classNames[8]} onClick={()=>{addDomain('Video Editing / VFX')}}>Video Editing / VFX</div>
        </div>
        <div id="error-message">{error}</div>
    </div>
}

export default FormComponent2 ;