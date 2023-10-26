import { Link } from "react-router-dom";
import "./SignUp.css";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const SignUp = () => {
  const [error, setError] = useState("");

  const { createUser } = useContext(AuthContext);

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    console.log(email, password, confirm);

    setError("");
    if (password !== confirm) {
      setError("Your password did not match");
      return;
    } else if (password.length < 6) {
      setError("password must be six character");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            required
          />
        </div>
        <p className="text-error">
          <small>{error}</small>
        </p>
        <input className="btn-submit" type="submit" value="Sign Up" />
      </form>
      <p className="link">
        <small>
          Already have an account <Link to="/login">Login</Link>
        </small>
      </p>
    </div>
  );
};

export default SignUp;
