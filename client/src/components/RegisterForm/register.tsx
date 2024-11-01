import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../api/api";
import { useLoading } from "../../context/loadingContext";
import "./register.css";

// Interface cho userData
interface UserData {
  email: string;
  password: string;
}

// Interface cho error response
interface ErrorResponse {
  response?: {
    status: number;
    data: {
      message: string;
    };
  };
}

const Register: FC = () => {
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const pass = e.target.value;
    setPassword(pass);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr("");
    setIsLoading(true);

    if (!email || !password) {
      setErr("All fields are required");
      setIsLoading(false);
      return;
    }

    const userData: UserData = {
      email,
      password,
    };

    try {
      const response = await authAPI.register(userData);
      if (response.data.access_token) {
        // localStorage.setItem("token", response.data.access_token);
        // navigate("/home");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      const err = error as ErrorResponse;
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setErr(err.response.data.message);
            break;
          case 409:
            setErr(err.response.data.message);
            break;
          default:
            setErr("Something went wrong");
            break;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='register-container'>
      <div className='register-main'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <input
              name='username'
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
              name='password'
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
};

export default Register;

