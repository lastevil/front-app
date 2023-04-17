import NavBar from "../menubar/NavBar";
import "./MyBody.css";
import React, { useState } from "react";
import TasksForm from "./Tasks/TasksForm";
import AdminForm from "./AdminForm";
import ChatForm from "./ChatForm";
import AnalyticForm from "./AnalyticForm";
import ProfileForm from "./ProfileForm";

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
        {menuItem === "Tasks" && <TasksForm />}
        {menuItem === "Chat" && <ChatForm />}
        {menuItem === "Analytic" && <AnalyticForm />}
        {menuItem === "Admin Panel" && <AdminForm />}
        {menuItem === "Profile" && <ProfileForm />}
      </div>
    </div>
  );
}
export default MyBody;
