import "./MyHeader.css";
import React, { useState } from "react";

function MyHeader(props) {
  var [visible, setVisible] = useState(props.visib);
  var [bar1, setBar1] = useState("bar1");
  var [bar2, setBar2] = useState("bar2");
  var [bar3, setBar3] = useState("bar3");

  function showMenu() {
    visible == true && setVisible(!visible);
    visible == true && setBar1("bar1_change");
    visible == true && setBar2("bar2_change");
    visible == true && setBar3("bar3_change");
    visible == false && setVisible(!visible);
    visible == false && setBar1("bar1");
    visible == false && setBar2("bar2");
    visible == false && setBar3("bar3");
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
        Выход
      </button>
    </div>
  );
}
export default MyHeader;
