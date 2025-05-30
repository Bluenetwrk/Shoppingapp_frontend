import React, { useState } from 'react';
import styles from './SignIn.module.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const phone = '+91 XXXXXXX';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signed in with password:', password);
  };

  const otpLogin=()=>{
      navigate("/otpAuth")
  }

  return (
    <div className={styles.container} style={{display:"flex", flexDirection:"column", alignItems:"center" , marginTop:"-40px"}}>
      <h1>Shopping Apps</h1>
      <div className={styles.card}>
        <h2>Sign in</h2>
        <p className={styles.phone}>
          {phone} <a href="#">Change</a>
        </p>

        <form onSubmit={handleSubmit}>
           <div style={{display:'flex' , alignItems:"center", justifyContent:"space-between"}}>
             <label style={{fontSize:"16px"}} htmlFor="password">Password</label>
             <a href="#" style={{fontSize:"14px"}}>Forgot password?</a>
          </div>
          <div className={styles.forgotRow}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
                      </div>

          <button type="submit" className={styles.signInBtn}>
            Sign in
          </button>

          <div className={styles.orLine}>
            <span>or</span>
          </div>

          <button onClick={otpLogin} className={styles.otpBtn}>
            Get an OTP on your phone
          </button>
        </form>

        <div className={styles.footer}>
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Help</a>
          <p>© 1996-2025, Shopping.com, Inc. or its affiliates</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
