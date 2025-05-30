import React, { useState } from 'react'
import styles from '../NewToITWalkin/NewToITWalkin.module.css'
import { useNavigate } from 'react-router-dom';

const NewToITWalkin = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", input);
  };

  const createAccount=()=>{
    navigate("/create-account")
  }
  return (
    <div className={styles.container}>
       {/* <img src="./image.png" alt="Amazon Logo" className={styles.logo}/> */}
       <h1>Shopping App</h1>
      <div className={styles.card}>
        <h3 style={{marginTop:"-15px", fontWeight:"400"}}>Looks Like you're new to Shopping App</h3>
        <form onSubmit={handleSubmit}>
         <div style={{display:"flex", alignItems:"center", gap:"10px"}}> 
            <p>+91 xxxxxxx </p><a href="#">Change</a> 
         </div> 
          <p>Let's create an account using your mobile number</p>          
          <button onClick={createAccount}>Proceed to create an Account</button>
        </form>
        <p className={styles.notice}>
          <h3>Already a customer ?</h3>
          <a href="#">Sign in with another email or mobile</a>
        </p>

        <hr />
      </div>
      <footer className={styles.footer}>
        <a href="#">Conditions of Use</a> ·
        <a href="#">Privacy Notice</a> ·
        <a href="#">Help</a>
        <p>© Shopping App.com</p>
      </footer>
    </div>
  );
};

export default NewToITWalkin