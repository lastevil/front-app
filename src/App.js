import MyBody from "./components/body/MyBody";
import { Buffer } from "buffer";
import MyHeader from "./components/MyHeader";
import React, { useState } from "react";
import Registration from "./components/login/Registration";
import LoginForm from "./components/login/LoginForm";

function App() {
  var [isVisible, setVisible] = useState(false);
  var [toRegistrate, setToRegistrate] = useState(false);
  var [lang, setLang] = useState("rus");
  localStorage.setItem("language", lang);

  function setVisibleMenu() {
    setVisible(!isVisible);
  }

  function useRegistrationForm(reg) {
    setToRegistrate(reg);
  }

  function changeLang(language) {
    setLang(language);
  }
  //постраться сделать отслеживание localstorage

  function TokenHandler(respToken) {
    if (respToken === "") {
      localStorage.clear();
      setVisible(!isVisible);
    } else {
      respToken !== "" && localStorage.setItem("token", respToken.token);
      var sub = [];
      sub = JSON.parse(
        Buffer.from(respToken.token.split(".")[1], "base64")
      ).roles;
      localStorage.setItem("roles", sub);
      var arrItem;
      if (sub.includes("ROLE_LOCAL_ADMIN")) {
        if (localStorage.getItem("language") === "rus")
          arrItem = ["Панель администратора"];
        if (localStorage.getItem("language") === "eng")
          arrItem = ["Admin Panel"];
      } else if (sub.includes("ROLE_ADMIN")) {
        if (lang === "rus")
          arrItem = [
            "Задачи",
            "Чат",
            "Аналитика",
            "Панель администратора",
            "Мой профиль",
          ];
        if (localStorage.getItem("language") === "eng")
          arrItem = ["Tasks", "Chat", "Analytic", "Admin Panel", "Profile"];
      } else {
        if (localStorage.getItem("language") === "rus")
          arrItem = ["Задачи", "Чат", "Аналитика", "Мой профиль"];
        if (localStorage.getItem("language") === "eng")
          arrItem = ["Tasks", "Chat", "Analytic", "Profile"];
      }
      localStorage.setItem("menuItems", arrItem);
      setVisible(!isVisible);
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
