import "./Register.css"
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

function Register() {
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [location,setLocation]=useState('');
    const [phone,setPhone]=useState('');
    
    async function sendDataForBackend(){
        const User={firstname:userName,
                    lastName:'weather',
                    mail: email,
                    role: 'Admin',
                    login: userName,//il faut s'authentifier with username
                    mdp: password,
                    country: location};
            if(userName !=='' & password!=='' & email!=='' & location!=='' & phone!==''){
                const response=await axios.post('http://localhost:9090/settings/v1/post',User)
                if(response.status===201){
                    swal({
                        title:"Congrats!",
                        text: `Acount created with login :${userName} `,
                        icon: "success",
                        button : "OK"
                    });
                }else{
                    swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'User already exist in data base !'
                      });
                }

            }else{alert("ALL FORM IS REQUIRED ! ");}  
        }
        
	return (
        <div className="box">
    <div className="container">

        <div className="top">
            <span>Haven't an account?</span>
            <header>Join us</header>
        </div>
        <form action="form">

        <div className="input-field">
            <input onChange={(e)=>setUserName(e.target.value)} type="text" className="input" placeholder="Username" id="name" />
            <i style={{display:"flex"}} className='bx bx-user' ></i>
        </div>
        <br></br>
        <div className="input-field">
         <input onChange={(e)=>setPassword(e.target.value)} type="Password" className="input" placeholder="Choose a Password" id="pass" />
            <i style={{display:"flex"}} className='bx bx-lock-alt'></i>
        </div>
        <br></br>
        <div class="input-field">
            <input onChange={(e)=>setEmail(e.target.value)} type="email" className="input" placeholder="Enter your email" id="emm" />
            <i style={{display:"flex"}} className="fa fa-envelope" aria-hidden="true"></i>
        </div>
        <br></br>
        <div class="input-field">
            <input onChange={(e)=>setPhone(e.target.value)} type="text" className="input" placeholder="Enter your Phone number" id="phone" />
            <i style={{display:"flex"}} className="fa fa-phone fa-lg fa-fw"></i>
        </div>
        <br></br>
        <div className="input-field">
            <input onChange={(e)=>setLocation(e.target.value)} type="text" class="input" placeholder="Enter your City" id="city" />
            <i style={{display:"flex"}} className="fa fa-map-marker"></i>
        </div>
        <br></br>
        </form>
        <div className="input-field">
            <input onClick={sendDataForBackend} type="submit" className="submit" value="Sign Up" id="" />
        </div>

           
        </div>
    </div>
  
    );
}
export default Register