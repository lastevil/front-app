import React, { useState } from "react";
import "./LoginForm.css";
import SendRequest from "../SendRequest";

function LoginForm(props) {
  var [password, setPassword] = useState("");
  var [login, setLogin] = useState("");

  function EmailHandler(event) {
    setLogin(event.target.value);
  }
  function PasswordHandler(event) {
    setPassword(event.target.value);
  }
  function Login(event) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    };

    SendRequest(requestOptions, "/auth/api/v1/auth").then((result) => {
      if (result.message != null) {
        alert(result.message);
      } else {
        props.setLogin(result);
      }
    });
    setLogin("");
    setPassword("");
  }

  function toRegistration() {
    setLogin("");
    setPassword("");
    props.reg(true);
  }

  return (
    <form onSubmit={Login}>
      <div className="container_login">
        <h3 align="center">Login</h3>

        <label htmlFor="email">
          <b>Email or Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email or Username"
          name="email"
          id="email"
          value={login}
          onChange={EmailHandler}
          required
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          value={password}
          onChange={PasswordHandler}
          required
        />
        <div className="buttonContainer">
          <button type="submit" className="blue-btn">
            Login
          </button>
          <button className="green-btn" onClick={toRegistration}>
            Registrate
          </button>
        </div>
      </div>
    </form>
  );
}
export default LoginForm;
