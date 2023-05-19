import Categorys from "../Categorys";
import AdminBar from "./AdminBar";
import React, { useState } from "react";
import UserActivation from "./UserActivation";
import DepartmentsControl from "./DepartmentsControl";
import UserDepartment from "./UserDepartment";

function AdminForm(props) {
  var categoryList = [];

  if (localStorage.getItem("language") === "rus") {
    categoryList = ["Пользователи", "Департаменты", "Права"];
  } else {
    categoryList = ["Users", "Departments", "Roles"];
  }

  var [currentCategory, setCurrentCategory] = useState(categoryList[0]);

  function SelectCategory(usedCategory) {
    setCurrentCategory(usedCategory);
  }

  return (
    <div>
      <Categorys>
        {categoryList.map((category) => (
          <AdminBar
            key={category}
            lable={category}
            usedCategory={currentCategory}
            selectCategory={SelectCategory}
          />
        ))}
      </Categorys>
      {currentCategory === categoryList[0] && (
        <UserActivation errorWindow={props.errorWindow} />
      )}
      {currentCategory === categoryList[1] && (
        <DepartmentsControl errorWindow={props.errorWindow} />
      )}
      {currentCategory === categoryList[2] && (
        <UserDepartment errorWindow={props.errorWindow} />
      )}
    </div>
  );
}
export default AdminForm;
