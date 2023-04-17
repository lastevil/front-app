import MenuItem from "./MenuItem";
import "./navbar.css";
import React, { useState } from "react";

function NavBar(props) {
  const navMenu = localStorage.getItem("menuItems").split(",");
  var [selected, setSelected] = useState(navMenu[0]);
  var keyNumber = 0;

  function getSelectedComponent(selected) {
    setSelected(selected);
    props.selectItem(selected);
  }

  return (
    <div className="menu">
      {navMenu.map((component) => (
        <MenuItem
          onClickHandler={getSelectedComponent}
          key={keyNumber++}
          title={component}
        />
      ))}
    </div>
  );
}
export default NavBar;
