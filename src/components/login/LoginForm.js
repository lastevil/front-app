import React, { useState } from "react";
import "./LoginForm.css";
import ReactModal from "react-modal";

function LoginForm(props) {
  var [password, setPassword] = useState("");
  var [email, setEmail] = useState("");
  var [resp, setResp] = useState("");
  var [showModal, setShowModal] = useState(false);

  function EmailHandler(event) {
    setEmail(event.target.value);
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
        email: email,
        password: password,
      }),
    };
    fetch("http://localhost:8701/auth/api/v1/auth", requestOptions)
      .then((response) => {
        if ((response.status >= 500) & !response.ok) {
          alert(response.statusText);
          throw new Error(response.statusText);
        } else return response.json();
      })
      .then((data) => {
        if (data.token == null) {
          if (data.message != null) {
            alert(data.message);
            throw new Error(data.message);
          }
        } else return data;
      })
      .then((token) => props.setLogin(token));
    setEmail("");
    setPassword("");
  }

  function toRegistration() {
    setEmail("");
    setPassword("");
    props.reg(true);
  }

  function handleOpenModal(res) {
    setResp(res);
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <form onSubmit={Login}>
      <div className="container_login">
        <h3 align="center">Login</h3>

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          value={email}
          onChange={EmailHandler}
          required
        />

        <ReactModal isOpen={showModal} contentLabel="Minimal Modal Example">
          <div>
            <div>{resp}</div>
            <button onClick={handleCloseModal}>Close Modal</button>
          </div>
        </ReactModal>

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
          <button type="submit" className="loginisterbtn">
            Login
          </button>
          <button className="registerbtn" onClick={toRegistration}>
            Registrate
          </button>
        </div>
      </div>
    </form>
  );
}
export default LoginForm;
