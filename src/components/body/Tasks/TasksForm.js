import TaskCategory from "./TaskCategory";
import "./TasksForm.css";
import React, { useState } from "react";
function TasksForm(props) {
  const categoryList = [
    "My tasks",
    "Department tasks",
    "Incoming tasks",
    "Sended tasks",
  ];

  var [classLable, setClassLable] = useState("taskCategoryItem");

  function sendClass(classLable) {
    setClassLable(classLable);
  }

  return (
    <div>
      <div className="tasks_categorys">
        {categoryList.map((category) => (
          <TaskCategory
            key={category}
            lable={category}
            classLable={classLable}
            setClass={sendClass}
          />
        ))}
      </div>
      <div>Content</div>
    </div>
  );
}
export default TasksForm;
