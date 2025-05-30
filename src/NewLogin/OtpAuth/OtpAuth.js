import React, { useState } from 'react';
import styles from './OtpAuth.module.css';

const OtpAuth = () => {
  const [otp, setOtp] = useState('');
  const phone = '+916204957203';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Entered OTP:', otp);
  };

  return (
    <div className={styles.container} style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1>Shopping App</h1>
      <div className={styles.card}>
        <h2>Authentication required</h2>
        <p className={styles.phone}>
          IN {phone} <a href="#">Change</a>
        </p>
        <p className={styles.info}>
          We’ve sent a One Time Password (OTP) to the mobile number above. Please enter it to complete verification
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="otp">Enter OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.continueBtn}>Continue</button>
        </form>

        <a href="#" className={styles.resend}>Resend OTP</a>

        <div className={styles.separator}><span>or</span></div>

        <button className={styles.altBtn}>Send OTP to WhatsApp</button>
        <button className={styles.altBtn}>Sign in with your password</button>

        <div className={styles.footer}>
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Help</a>
          <p>© 1996-2025, Amazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </div>
  );
};

export default OtpAuth;
