import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [err, setErr] = useState();

  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleChangePassword = (e) => {
    const pass = e.target.value;
    setPassword(pass);
  };

  const handleSubmit = async (e) => {};

  return (
    <div className='register-container'>
      <div className='register-main'>
        <h1>Register</h1>
        <form>
          <div className='form-control'>
            <input
              name='username'
              type='email'
              required={true}
              placeholder='Enter Your Email'
              onChange={handleChangeEmail}
            />
            <small></small>
            <span></span>
          </div>
          <div className='form-control'>
            <input
              name='password'
              type='password'
              required={true}
              placeholder='Enter Your Password'
              onChange={handleChangePassword}
            />
            <small></small>
            <span></span>
          </div>
          <button className='btn-submit' onClick={handleSubmit} type='submit'>
            Sign Up
          </button>
        </form>
        <div className='check-error'>
          <span>{err}</span>
        </div>
        <div className='sign-up'>
          You have an account? <Link to='/login'>Sign In</Link>
        </div>
        <div className='forgot-pass'>Forgot Password?</div>
      </div>
    </div>
  );
}

export default Register;
