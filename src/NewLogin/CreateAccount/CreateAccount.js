import React, { useState } from 'react';
import styles from '../CreateAccount/CreateAccount.module.css';

const CreateAccount = () => {
  const [form, setForm] = useState({
    mobile: '',
    name: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', form);
  };

  return (
    <>
      {/* <img src="./image.png" alt="Amazon Logo" className={styles.logo}/> */}
    

    <div className={styles.container} style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <h1>Shopping App</h1>
      <div className={styles.card}>
        <h2>Create Account</h2>
       <form onSubmit={handleSubmit}>
          <label>Enter Mobile number or Email</label>
          <div className={styles.inputGroup}>
            {/* <select className={styles.countryCode}>
              <option value="+91">IN +91</option>
            </select> */}
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <label>Your name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Password (at least 6 characters)</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength="6"
          />
          <p className={styles.note}>Passwords must be at least 6 characters.</p>
          <label>Re-enter Password (at least 6 characters)</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength="6"
          />
          <p className={styles.info}>
            To verify your number, we will send you a text message with a temporary code. Message and data rates may apply.
          </p>
          <button type="submit" className={styles.button}>
            Verify mobile number
          </button>
        </form>
        <div className={styles.bottomLinks}>
          <p>Already a customer? <a href="#">Sign in instead</a></p>
        </div>
        <p className={styles.terms}>
          By creating an account or logging in, you agree to Shopping App <a href="#">Conditions of Use</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
    </>
  );
};

export default CreateAccount;
