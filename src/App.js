import MyBody from "./components/body/MyBody";
import { Buffer } from "buffer";
import MyHeader from "./components/MyHeader";
import React, { useState } from "react";
import Registration from "./components/login/Registration";
import LoginForm from "./components/login/LoginForm";

function App() {
  var [isVisible, setVisible] = useState(true);
  var [toRegistrate, setToRegistrate] = useState(false);
  var [token, setToken] = useState(null);

  function setVisibleMenu() {
    setVisible(!isVisible);
  }

  function useRegistrationForm(reg) {
    setToRegistrate(reg);
  }

  function TokenHandler(respToken) {
    setToken(respToken);
    respToken !== "" && localStorage.setItem("token", respToken.token);
    (respToken === "") | (respToken === null) && localStorage.clear();
    var sub = [];
    (respToken !== "") | (respToken === null) &&
      (sub = JSON.parse(
        Buffer.from(respToken.token.split(".")[1], "base64")
      ).roles);
    localStorage.setItem("roles", sub);
    //Получить список меню из токена.
    var arrItem = ["Tasks", "Chat", "Analytic", "Admin Panel", "Profile"];
    localStorage.setItem("menuItems", arrItem);
  }

  return (
    <div>
      {localStorage.getItem("token") === null && toRegistrate === false && (
        <LoginForm reg={useRegistrationForm} setLogin={TokenHandler} />
      )}
      {localStorage.getItem("token") === null && toRegistrate === true && (
        <Registration reg={useRegistrationForm} />
      )}
      {localStorage.getItem("token") !== null && (
        <div>
          <MyHeader
            visibleMenu={setVisibleMenu}
            visib={isVisible}
            setLogin={TokenHandler}
          />
          <MyBody vis={isVisible} />
        </div>
      )}
    </div>
  );
}
export default App;
