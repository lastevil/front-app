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
  var [lang, setLang] = useState("rus");
  function setVisibleMenu() {
    setVisible(!isVisible);
  }

  function useRegistrationForm(reg) {
    setToRegistrate(reg);
  }

  function changeLang(language) {
    setLang(language);
  }

  function TokenHandler(respToken) {
    setToken(respToken);
    if (respToken === "") {
      localStorage.clear();
    } else {
      respToken !== "" && localStorage.setItem("token", respToken.token);
      var sub = [];
      sub = JSON.parse(
        Buffer.from(respToken.token.split(".")[1], "base64")
      ).roles;
      localStorage.setItem("roles", sub);
      console.log(sub);
      var arrItem;
      if (sub.includes("ROLE_LOCAL_ADMIN")) {
        if (lang === "rus") arrItem = ["Панель администратора"];
        if (lang === "eng") arrItem = ["Admin Panel"];
      } else if (sub.includes("ROLE_ADMIN")) {
        if (lang === "rus")
          arrItem = [
            "Задачи",
            "Чат",
            "Аналитика",
            "Панель администратора",
            "Мой профиль",
          ];
        if (lang === "eng")
          arrItem = ["Tasks", "Chat", "Analytic", "Admin Panel", "Profile"];
      } else {
        if (lang === "rus")
          arrItem = ["Задачи", "Чат", "Аналитика", "Мой профиль"];
        if (lang === "eng") arrItem = ["Tasks", "Chat", "Analytic", "Profile"];
      }
      localStorage.setItem("menuItems", arrItem);
    }
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
