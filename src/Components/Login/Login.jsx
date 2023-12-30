import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false)
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    setError("");
    
    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        form.reset();
        navigate(from, { replace:true });
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid Password");
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label htmlFor="">Email</label>
          <input type="email" name="email" placeholder="Email" required />
        </div>
        <div className="form-control">
          <label htmlFor="">Password</label>
          <input
            type={show ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            required
          />
          <p onClick={()=> setShow(!show)}>
            <small>
              {
                show ? <span>Hide Password</span> : <span>Show Password</span>
              }
            </small>
          </p>
        </div>
        <p className="text-error">
          <small>{error}</small>
        </p>
        <input className="btn-submit" type="submit" value="Login" />
      </form>
      <p className="link">
        <small>
          New to Ema-john? <Link to="/sign-up">Create New Account</Link>
        </small>
      </p>
    </div>
  );
};

export default Login;
