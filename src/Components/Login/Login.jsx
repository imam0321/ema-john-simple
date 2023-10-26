import { Link } from "react-router-dom";
import "./Login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");
  const { signIn } = useContext(AuthContext);

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
            type="password"
            name="password"
            placeholder="Password"
            required
          />
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
