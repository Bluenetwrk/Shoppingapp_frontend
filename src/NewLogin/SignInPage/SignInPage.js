import React, { useState } from 'react'
import styles from '../SignInPage/SignInPage.module.css'
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
    const navigate = useNavigate()
  
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", input);

  };

  const checkReg = () => {
    console.log(input)
    if (input.trim() === "1234567890") {
      navigate("/sign");
    } else {
      navigate("/newuser");
    }
  };
  
  return (
    <div className={styles.container}>
       {/* <img src="./image.png" alt="Amazon Logo" className={styles.logo}/> */}
       <h1>Shopping App</h1>
      <div className={styles.card}>
        <h3 style={{marginTop:"-15px", fontWeight:"400"}}>Sign in or create account</h3>
        {/* <form onSubmit={handleSubmit}> */}
          <label style={{fontWeight:"600", fontSize:"14px"}}>Enter mobile number or email</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            style={{height:"10px", width:"100%"}}
          />
              {/* <a href='../Sign/SignIn.jsx'> */}
          <button  onClick={checkReg} style={{width:"100%"}}>Continue</button>
          {/* </a> */}
        {/* </form> */}
        <p className={styles.notice}>
          By continuing, you agree to Shopping's{" "}
          <a href="#">Conditions of Use</a> and{" "}
          <a href="#">Privacy Notice</a>.
        </p>
        <a className={styles.link} href="#">Need help?</a>
        <hr />
      </div>
      <footer className={styles.footer}>
        <a href="#">Conditions of Use</a> ·
        <a href="#">Privacy Notice</a> ·
        <a href="#">Help</a>
        <p>©ShoppingApp.com</p>
      </footer>
    </div>
  );
};

export default SignInPage