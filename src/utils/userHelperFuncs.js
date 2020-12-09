import instance from '../apis/recruitmentApi' ;
import { ToastContainer, toast } from 'react-toastify';

export async function signUpUser(regNo,name,phoneNo,email,pass,signUpIndicator) {
    console.log('api called- prolly');
    let userdets ={};
    let path = "";
     if(signUpIndicator===true) {
        const regex = RegExp("^[a-zA-Z0-9]+[.][a-zA-Z0-9]+(2020)@(vitstudent)\\.ac\\.in$");
        if(regNo===""||name===""||phoneNo===""||email===""||pass===""){
            toast.dark('Please fill all the fields!', {
                position: "top-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return;
        }
        if(!regex.test(email)) {
           toast.dark('Please ensure you are a fresher and are using your vit email id!', {
               position: "top-center",
               autoClose: false,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               });
           return;
        }
         if(pass.length <8) {
            toast.dark('The password must be atleast 8 characters long!', {
                position: "top-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return;
         }
         userdets = {
            regNo: regNo,
            name: name,
            phoneNo: phoneNo,
            email: email,
            password: pass
          };
          path ="/api/register";
     }
      else {
        userdets = {
            regNo: regNo,
            password: pass
          };
        path ="/api/login";
      }
      const jsonUserDets = JSON.stringify(userdets);
      console.log(jsonUserDets);
      instance.post(path, 
      jsonUserDets, {
          headers : {
              "Content-Type" : "application/json" 
          } 
        })
        .then((resp) => {
            console.log(resp.data);
        })
        .catch((err) => {
            console.log(err);
        }
      );
}  