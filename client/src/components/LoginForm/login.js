import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

/**
 * A component for logging in to the application.
 *
 * @returns {ReactElement} A React element representing the login form.
 */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  /**
   * Handles changes to the email input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e The event that triggered this function.
   */
  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  /**
   * Handles changes to the password input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e The event that triggered this function.
   */
  const handleChangePassword = (e) => {
    const pass = e.target.value;
    setPassword(pass);
  };

  /**
   * Handles the form submission.
   *
   * @param {React.FormEvent<HTMLFormElement>} e The event that triggered this function.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement the login logic here.
    console.log(email, password);
  };

  return (
    <div className='login-container'>
      <div className='login-main'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <input
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
              type='password'
              required={true}
              placeholder='Enter Your Password'
              onChange={handleChangePassword}
            />
            <small></small>
            <span></span>
          </div>
          <button className='btn-submit' type='submit'>
            Login
          </button>
        </form>
        <div className='check-error'>
          <span>{err}</span>
        </div>
        <div className='sign-up'>
          Not a member? <Link to='/register'>Sign Up</Link>
        </div>
        <div className='forgot-pass'>Forgot Password?</div>
      </div>
    </div>
  );
}

export default Login;
