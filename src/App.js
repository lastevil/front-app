import AppBody from "./components/body/AppBody";
import { Buffer } from "buffer";
import MyHeader from "./components/MyHeader";
import React, { useState } from "react";
import Registration from "./components/login/Registration";
import LoginForm from "./components/login/LoginForm";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function App() {
  var [isVisible, setVisible] = useState(false);
  var [toRegistrate, setToRegistrate] = useState(false);
  var [lang, setLang] = useState("rus");
  var [open, setOpen] = useState(false);
  var [errorMes, setErrorMess] = useState("");

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
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

  function ErrorHandler(error) {
    setErrorMess(error);
    OpenHandler();
    if (localStorage.getItem("token") === null) {
      TokenHandler("");
    }
  }
  function OpenHandler() {
    setOpen(true);
  }
  function CloseHandler() {
    setOpen(false);
  }

  return (
    <div>
      {(localStorage.getItem("token") === null) & (toRegistrate === false) ? (
        <LoginForm
          reg={useRegistrationForm}
          setLogin={TokenHandler}
          errorWindow={ErrorHandler}
        />
      ) : (
        <div className="no__display" />
      )}
      {(localStorage.getItem("token") === null) & (toRegistrate === true) ? (
        <Registration reg={useRegistrationForm} errorWindow={ErrorHandler} />
      ) : (
        <div className="no__display" />
      )}
      {localStorage.getItem("token") !== null ? (
        <div>
          <MyHeader
            visibleMenu={setVisibleMenu}
            visib={isVisible}
            setLogin={TokenHandler}
          />
          <AppBody vis={isVisible} errorWindow={ErrorHandler} />
        </div>
      ) : (
        <div className="no__display" />
      )}
      <Modal
        keepMounted
        open={open}
        onClose={CloseHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} className="modal__style">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Error:
          </Typography>
          <Typography id="modal-modal-description">{errorMes}</Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default App;
