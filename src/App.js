import React, { useState } from 'react';
import './App.css';
import {faDumbbell, faHotel, faCalendarAlt, faCog, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HotelApp from './components/HotelApp.js';

function App() {
  const[loggedIn, setLoggedIn] = useState(false);

  const[userData, setUserData] = useState({});

  const[showLogin,setShowLogin] = useState(true);

  const[email, setEmail] = useState("");

  const[showText, setShowText] = useState("");

  const[password, setPassword] = useState("");

  const[name, setName] = useState("");

  const[LoginEmailNotProper, setLoginEmailNotProper] = useState(false);

  const[LoginPassWordNotProper, setLoginPasswordNotProper] = useState(false);

  const [LoginNameNotProper, setLoginNameNotProper] = useState(false);

  let viewCallBack = ()=>{
    setShowText("");
    setEmail("");
    setPassword("");
    setLoginEmailNotProper("");
    setLoginPasswordNotProper("");
    setShowLogin(!showLogin);
  }

  let loginCallBack = (res, message) =>{
    if(res){
      let userObj = {
        userEmail:email
      }
      setUserData(userObj);
      setLoggedIn(true);
    }
    else{
      setShowText(message);
    }
  }

  let registerCallBack =(res, message) =>{
    if(res){
      let userObj = {
        userEmail:email
      }
      setUserData(userObj);
      setLoggedIn(true);
    }
    else{
      setShowText(message);
    }
  }

  let handleLogin = ()=>{
    console.log("into login")
    if(!email){
      setLoginEmailNotProper(true);
      setShowText('Email Cannot be empty')
    }
    else if(!password){
      setLoginPasswordNotProper(true);
      setShowText('Password Cannto be Empty')
    }
    if(!validateEmail(email)){
      setLoginEmailNotProper(true);
      setShowText("Email not proper");
    }
    else{
      login(email,password,loginCallBack);
    }
  }

  let handleRegister = () => {
    if(!email){
      setLoginEmailNotProper(true);
      setShowText('Email Cannot be empty')
    }
    else if(!password){
      setLoginPasswordNotProper(true);
      setShowText('Password Cannto be Empty')
    }
    else if(!name){
      setLoginEmailNotProper(true)
      setShowText("Name Cannot be empty");
    }
    else if(!validateEmail(email)){
      setLoginEmailNotProper(true);
      setShowText("Email not proper");
    }
    else{
      register(name,email,password,registerCallBack)
    }
  }

  return(loggedIn ? <HotelApp userData={userData}></HotelApp> : 
      showLogin ?
       <div className='login-container'>
      <input type='text' value={email} placeholder="Email Id" className="input-text" onChange={(e) => {setEmail(e.target.value); setLoginEmailNotProper(false); setShowText('')}} style={LoginEmailNotProper ? {border:'1px solid red'} : {}}></input>
      <input type='password' value={password} placeholder="Password" className="input-text" onChange={(e) => {setPassword(e.target.value);setLoginPasswordNotProper(false);setShowText('')}} style={LoginPassWordNotProper ? {border:'1px solid red'} : {}}></input>
      <button className="signInBUtton" onClick={() => handleLogin()}>Login</button>
      <div className="content-extra">
       Register Here : <span style={{color:'blue', marginLeft:'10px', cursor:'pointer'}} onClick={() => viewCallBack()}>Register</span>
      </div>
      <div style={{textAlign:'center'}}>
      <p style={{textAlign:'center'}}>{showText}</p>
      </div>
  </div>  :
  <div className='login-container'>
  <input type='text' placeholder="Name" value={name} className="input-text" onChange={(e) => {setName(e.target.value); setLoginEmailNotProper(false);setShowText('')}}  style={LoginNameNotProper ? {border:'1px solid red'} : {}} ></input>
  <input type='text' placeholder="Email Id" value={email} className="input-text" onChange={(e) => {setEmail(e.target.value); setLoginEmailNotProper(false);setShowText('')}} style={LoginEmailNotProper ? {border:'1px solid red'} : {}}></input>
  <input type='password' placeholder="Password" value={password} className="input-text" onChange={(e) => {setPassword(e.target.value); setLoginEmailNotProper(false);setShowText('')}} style={LoginEmailNotProper ? {border:'1px solid red'} : {}}></input>
  <button className="signInBUtton" onClick={() => handleRegister()}>Register</button>
  <div className="content-extra">
  Aldready User Login Here : <span style={{color:'blue', marginLeft:'10px', cursor:'pointer'}} onClick={() => viewCallBack()}>Login</span>
  </div>
  <div style={{textAlign:'center'}}>
    <p style={{textAlign:'center'}}>{showText}</p>
  </div>
</div> 
    )
}

function login(email, password, callback){
  const request = {
    emailId:email,
    password:password
  }
  console.log(request);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  };

  fetch("http://localhost:8083/user/login",requestOptions)
  .then(res => res.json())
  .then(res =>{
    callback(res.response, res.message);
  })

}

function register(name, email, password, callback){
  const request = {
    name:name,
    emailId:email,
    password:password
  }
  console.log(request);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  };
  fetch("http://localhost:8083/user/register",requestOptions)
  .then(res => res.json())
  .then(res => callback(res.response, res.message));
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
export default App;


