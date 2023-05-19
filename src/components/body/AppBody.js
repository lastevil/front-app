import NavBar from "../menubar/NavBar";
import "./AppBody.css";
import React, { useState } from "react";
import TasksForm from "./Tasks/TasksForm";
import AdminForm from "./Admin/AdminForm";
import ChatForm from "./Chat/ChatForm";
import AnalyticForm from "./Analytic/AnalyticForm";
import ProfileForm from "./Profile/ProfileForm";

function AppBody(props) {
  var [menuItem, setMenuItem] = useState(
    localStorage.getItem("menuItems").split(",")[0]
  );

  function selectMenuItem(item) {
    setMenuItem(item);
  }

  return (
    <div className="newBody">
      <div className="menuBar">
        {props.vis && <NavBar selectItem={selectMenuItem} />}
      </div>
      <div className="pages">
        {(menuItem === "Tasks" && (
          <TasksForm errorWindow={props.errorWindow} />
        )) ||
          (menuItem === "Задачи" && (
            <TasksForm errorWindow={props.errorWindow} />
          ))}
        {(menuItem === "Chat" && (
          <ChatForm errorWindow={props.errorWindow} />
        )) ||
          (menuItem === "Чат" && <ChatForm errorWindow={props.errorWindow} />)}
        {(menuItem === "Analytic" && (
          <AnalyticForm errorWindow={props.errorWindow} />
        )) ||
          (menuItem === "Аналитика" && (
            <AnalyticForm errorWindow={props.errorWindow} />
          ))}
        {(menuItem === "Admin Panel" && (
          <AdminForm errorWindow={props.errorWindow} />
        )) ||
          (menuItem === "Панель администратора" && (
            <AdminForm errorWindow={props.errorWindow} />
          ))}
        {(menuItem === "Profile" && (
          <ProfileForm errorWindow={props.errorWindow} />
        )) ||
          (menuItem === "Мой профиль" && (
            <ProfileForm errorWindow={props.errorWindow} />
          ))}
      </div>
    </div>
  );
}
export default AppBody;
