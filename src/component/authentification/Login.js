import "./Login.css"
import axios from "axios";
import { useState } from "react";
import {Link} from 'react-router-dom';
import swal from "sweetalert";
import { useEffect } from "react";

function Login() {
    const [login,setLogin]=useState('');
    const [password,setPassword]=useState('');


     async function sendDataToBackend() {
       if(login!=='' & password !==''){
        const response=await axios.get(`http://localhost:9090/settings/jwt/${login}/${password}`);
        if(response.status===200){
            console.log("your jwt is : "+response.data);
            localStorage.setItem('jwt',response.data);
            console.log("jwt from locale storage : "+ localStorage.getItem("jwt"));
            window.location.href="/dashboard" ;  
        }
        else{
            swal({
                icon: 'success',
                title: 'Oops...',
                text: 'User already exist in data base !'
              });
        }
       }else{
        alert("ALL INPUTS ARE REQUIRED !");
       }
    }
	return (
<div className="box">
    <div className="container">

        <div className="top">
            <span>Have an account?</span>
            <header>Login</header>
        </div>

        <div className="input-field">
            <input onChange={(e)=>setLogin(e.target.value)} type="text" className="input" placeholder="Username" id="user" />
            <i style={{display: "flex"}} className='bx bx-user' ></i>
        </div>
        <br></br>
        <div className="input-field">
            <input onChange={(e)=>setPassword(e.target.value)} type="Password" className="input" placeholder="Password" id="pass"/>
            <i style={{display:"flex"}} className='bx bx-lock-alt'></i>
        </div>
        <br></br>
        <div className="input-field">
            <input onClick={sendDataToBackend} type="submit" className="submit" value="Login" id="log"/>
        </div>

        <div className="two-col">
            <div className="one">
               <input type="checkbox" name="" id="check"/>
               <label for="check"> Remember Me</label>
            </div>
            <div className="two">
               <Link to='/register'>you don't have an acount ?</Link>
            </div>
        </div>
    </div>
</div> 

	);
}

export default Login;

