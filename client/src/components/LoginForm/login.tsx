import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../api/api";
import { useLoading } from "../../context/loadingContext";
import "./login.css";

// Interfaces
interface Credentials {
  email: string;
  password: string;
}

interface ErrorResponse {
  response?: {
    status: number;
    data: {
      message: string;
    };
  };
  request?: unknown;
}

/**
 * A component for logging in to the application.
 */
const Login: FC = () => {
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string>("");

  /**
   * Handles changes to the email input.
   */
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  /**
   * Handles changes to the password input.
   */
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const pass = e.target.value;
    setPassword(pass);
  };

  /**
   * Handles the form submission.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr("");
    setIsLoading(true);

    if (!email || !password) {
      setErr("All fields are required");
      setIsLoading(false);
      return;
    }

    const credentials: Credentials = {
      email,
      password,
    };

    try {
      const response = await authAPI.login(credentials);
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        navigate("/home");
      }
    } catch (error) {
      const err = error as ErrorResponse;
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setErr("Invalid email or password");
            break;
          case 401:
            setErr("Unauthorized access");
            break;
          case 404:
            setErr("User not found");
            break;
          default:
            setErr("Something went wrong. Please try again later");
        }
      } else if (err.request) {
        setErr("No response from server");
      } else {
        setErr("Error in request");
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-main'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <input
              type='email'
              required
              placeholder='Enter Your Email'
              onChange={handleChangeEmail}
              value={email}
            />
            <small></small>
            <span></span>
          </div>
          <div className='form-control'>
            <input
              type='password'
              required
              placeholder='Enter Your Password'
              onChange={handleChangePassword}
              value={password}
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
};

export default Login;

