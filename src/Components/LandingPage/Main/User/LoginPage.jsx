import _ from "lodash";
import React, { useState } from "react";
import "../../../../css/LoginPage.css";
import { login } from "../../../../lib/networkCalls";
import { Alert } from "../../Alert";

export const LoginPage = ({ setIsUserLoggedIn, updateLocation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onUserNameChange = ({ target }) => {
    setUsernameError(false);
    setUsername(target.value);
  };

  const onPasswordChange = ({ target }) => {
    setPasswordError(false);
    setPassword(target.value);
  };

  const isFormInValid = () => {
    let isInvalid = false;
    if (_.isEmpty(username.trim())) {
      isInvalid = true;
      setUsernameError(true);
    }
    if (_.isEmpty(password.trim())) {
      isInvalid = true;
      setPasswordError(true);
    }
    return isInvalid;
  };

  const onLogin = () => {
    if (isFormInValid()) return;
    setUsernameError(false);
    setPasswordError(false);
    login(
      username,
      password,
      setIsUserLoggedIn,
      updateLocation,
      setError,
      setSuccessMessage
    );
  };

  const gotoRegister = () => updateLocation("/register");

  return (
    <section className="login">
      {!!error && !successMessage && <Alert type="error" message={error} />}
      {!!successMessage && !error && (
        <Alert type="success" message={successMessage} />
      )}
      <section className="login_form" onSubmit={onLogin}>
        <h3 className="login_header">Welcome Back</h3>
        <section className="credentials">
          <input
            type="text"
            placeholder="Enter Username"
            className={`credential ${usernameError ? "error" : ""}`}
            onChange={onUserNameChange}
            autoComplete="on"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className={`credential ${passwordError ? "error" : ""}`}
            onChange={onPasswordChange}
            autoComplete="on"
          />
        </section>
        <button
          type="button"
          className="login_button"
          onClick={onLogin}
          data-testid="login_button"
        >
          Login
        </button>
        <span
          className="create_account"
          onClick={gotoRegister}
          data-testid="create_account"
        >
          <b>New User? Create Account</b>
        </span>
      </section>
    </section>
  );
};
