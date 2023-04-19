import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import "./Registration.css";

function Registration(props) {
  var [firstName, setFirstName] = useState("");
  var [lastName, setLastName] = useState("");
  var [password, setPassword] = useState("");
  var [repPassword, setRepPassword] = useState("");
  var [email, setEmail] = useState("");
  var [buttonClass, setButtonClass] = useState("registerbtn");
  var [btnEnable, setBtnEnable] = useState(false);

  function Registr(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    };
    fetch(
      "http://localhost:8701/auth/api/v1/registration",
      requestOptions
    ).then((response) => {
      if (!response.ok) {
        alert(response.statusText);
        throw new Error(response.statusText);
      } else {
        props.reg(false);
      }
    });
  }

  function toLogin() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRepPassword("");
    props.reg(false);
  }

  function FirstNameHandler(event) {
    setFirstName(event.target.value);
  }
  function LastNameHandler(event) {
    setLastName(event.target.value);
  }
  function EmailHandler(event) {
    setEmail(event.target.value);
  }
  function PasswordHandler(event) {
    setPassword(event.target.value);
  }
  function RepPasswordHandler(event) {
    setRepPassword(event.target.value);
  }

  return (
    <form onSubmit={Registr}>
      <div className="container_registration">
        <h3 align="center">Register</h3>

        <label htmlFor="first-name">
          <b>First Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter your First Name"
          name="first-name"
          id="first-name"
          value={firstName}
          onChange={FirstNameHandler}
          required
        />

        <label htmlFor="last-name">
          <b>Last Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter your Last Name"
          name="last-name"
          id="last-name"
          value={lastName}
          onChange={LastNameHandler}
          required
        />

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          id="email"
          value={email}
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

        <label htmlFor="psw-repeat">
          <b>Repeat Password</b>
        </label>
        <input
          type="password"
          placeholder="Repeat Password"
          name="psw-repeat"
          id="psw-repeat"
          value={repPassword}
          onChange={RepPasswordHandler}
          required
        />
        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={5}
          value={password}
          valueAgain={repPassword}
          onChange={(isValid) => {
            isValid === false && setButtonClass("registerbtn_noactive");
            isValid === false && setBtnEnable(true);
            isValid === true && setButtonClass("registerbtn");
            isValid === true && setBtnEnable(false);
          }}
        />
        <div className="buttonContainer">
          <button disabled={btnEnable} type="submit" className={buttonClass}>
            Register
          </button>
          <button className="cncisterbtn" onClick={toLogin}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
export default Registration;
