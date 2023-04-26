import NavBar from "../menubar/NavBar";
import "./MyBody.css";
import React, { useState } from "react";
import TasksForm from "./Tasks/TasksForm";
import AdminForm from "./Admin/AdminForm";
import ChatForm from "./Chat/ChatForm";
import AnalyticForm from "./Analytic/AnalyticForm";
import ProfileForm from "./Profile/ProfileForm";

function MyBody(props) {
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
        {(menuItem === "Tasks" && <TasksForm />) ||
          (menuItem === "Задачи" && <TasksForm />)}
        {(menuItem === "Chat" && <ChatForm />) ||
          (menuItem === "Чат" && <ChatForm />)}
        {(menuItem === "Analytic" && <AnalyticForm />) ||
          (menuItem === "Аналитика" && <AnalyticForm />)}
        {(menuItem === "Admin Panel" && <AdminForm />) ||
          (menuItem === "Панель администратора" && <AdminForm />)}
        {(menuItem === "Profile" && <ProfileForm />) ||
          (menuItem === "Мой профиль" && <ProfileForm />)}
      </div>
    </div>
  );
}
export default MyBody;
