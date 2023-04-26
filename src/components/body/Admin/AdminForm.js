import Categorys from "../Categorys";
import AdminBar from "./AdminBar";
import React, { useEffect, useState } from "react";
import UserActivation from "./UserActivation";
import DepartmentsControl from "./DepartmentsControl";
import UserDepartment from "./UserDepartment";

function AdminForm(props) {
  const categoryListRus = [
    "Активация пользователей",
    "Департаменты",
    "Права пользователей",
  ];

  const categoryListEng = ["User Activation", "Departments", "User roles"];
  //добавить переключение языка
  var [categoryList, setCategoryList] = useState(categoryListRus);

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
      {currentCategory == categoryList[0] && <UserActivation />}
      {currentCategory == categoryList[1] && <DepartmentsControl />}
      {currentCategory == categoryList[2] && <UserDepartment />}
    </div>
  );
}
export default AdminForm;
