import "./MyHeader.css";
import React, { useEffect, useState } from "react";

function MyHeader(props) {
  var [bar1, setBar1] = useState("bar1");
  var [bar2, setBar2] = useState("bar2");
  var [bar3, setBar3] = useState("bar3");

  var btnTitle;

  if (localStorage.getItem("language") === "rus") {
    btnTitle = "Выход";
  } else {
    btnTitle = "Exit";
  }

  useEffect(() => {
    if (props.visib === false) {
      setBar1("bar1_change");
      setBar2("bar2_change");
      setBar3("bar3_change");
    } else {
      setBar1("bar1");
      setBar2("bar2");
      setBar3("bar3");
    }
  }, [props.visib]);

  function showMenu() {
    props.visibleMenu();
  }

  function Logoff() {
    props.setLogin("");
  }

  return (
    <div className="header__aroun">
      <div className="container_header" onClick={showMenu}>
        <div className={bar1}></div>
        <div className={bar2}></div>
        <div className={bar3}></div>
      </div>
      <button className="logoffbtn" onClick={Logoff}>
        {btnTitle}
      </button>
    </div>
  );
}
export default MyHeader;
