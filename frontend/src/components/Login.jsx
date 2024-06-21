import React from "react";
import GoogleButton from 'react-google-button';
import './Login.css';

const Login = () => {
  return (
    <div className="loginPage">
      <GoogleButton className="loginButton"/>
    </div>
  );
};



export default Login;