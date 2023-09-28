import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Login.css";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
const Login = () => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    class: "error-login",
  });

  const [login] = useMutation(LOGIN_USER);

  const onChange = (e) => {
    const { value, name } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const displayErrorMessage = (message) => {
    setErrorMessage({ message: message, class: "error-active" });

    setTimeout(function () {
      setErrorMessage({ message: "", class: "error-login" });
    }, 1000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.loginUser.token);
    } catch (error) {
      console.log(error);
      displayErrorMessage(error.message);
    }
  };
  return (
    <>
      <div className="log-form">
        <h2>Login to your account</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            onChange={onChange}
            type="text"
            placeholder="username"
            name="username"
          />
          <input
            onChange={onChange}
            type="password"
            name="password"
            placeholder="password"
          />
          <button type="submit" className="btn">
            Login
          </button>
          <p className={errorMessage.class}>Incorrect Credientals</p>
          <Link className="signup" to={"/signup"}>
            Or Signup
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
