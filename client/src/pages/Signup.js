import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Login.css";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../utils/mutations";
const Signup = () => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    class: "error-login",
  });

  const [errorList, setErrorList] = useState();

  const [signup] = useMutation(SIGNUP_USER);

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

  const checkForm = () => {
    const errors = [];
    setErrorList(null);

    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!formState.username) {
      errors.push("Please enter username");
    }
    if (!formState.email) {
      errors.push("Please enter an email");
    } else if (!re.test(formState.email)) {
      errors.push("Invalid Email");
    }
    if (!formState.password) {
      errors.push("Please enter a password");
    }

    if (errors.length !== 0) {
      displayError(errors);
      return false;
    }

    return true;
  };
  const displayError = (errors) => {
    setErrorList(
      errors.map((value) => {
        return <li key={value}>{value}</li>;
      })
    );
    console.log(errorList);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!checkForm()) return;

    try {
      const { data } = await signup({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.signupUser.token);
    } catch (error) {
      displayErrorMessage(error.message);
    }
  };
  return (
    <>
      <div className="log-form">
        <h2>Create a new Account</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            onChange={onChange}
            type="email"
            name="email"
            placeholder="email"
          />
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
          <ul className="errors">{errorList}</ul>
          <button type="submit" className="btn">
            Signup
          </button>
          <Link className="signup" to={"/login"}>
            Or Login
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
