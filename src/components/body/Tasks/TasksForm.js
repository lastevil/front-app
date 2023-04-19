import TaskCategory from "./TaskCategory";
import TaskContent from "./TaskContent";
import TaskFilter from "./TaskFilter";
import "./TasksForm.css";
import React, { useState } from "react";
function TasksForm(props) {
  const categoryList = [
    "My tasks",
    "Department tasks",
    "Incoming tasks",
    "Sended tasks",
  ];

  const statuses = [
    "BACKLOG",
    "IN_PROGRESS",
    "DONE",
    "ACCEPTED",
    "DELETED",
    "OVERDUE",
    "THREE_DAYS_LEFT",
    "TWO_DAYS_LEFT",
    "TODAY_LEFT",
  ];

  var [taskLable, setTaskLable] = useState(categoryList[0]);
  var [taskStatus, setStatus] = useState(statuses[0]);

  function setTaskCategory(taskLabel) {
    setTaskLable(taskLabel);
  }

  function setStatusFilter(statusFilter) {
    setStatus(statusFilter);
    console.log(statusFilter);
    console.log(taskStatus);
  }

  return (
    <div className="task_body">
      <div className="tasks_categorys">
        {categoryList.map((category) => (
          <TaskCategory
            key={category}
            lable={category}
            usedTask={taskLable}
            taskCategory={setTaskCategory}
          />
        ))}
      </div>
      <div className="filter">
        <TaskFilter statusList={statuses} setFilter={setStatusFilter} />
      </div>
      <div className="task_content">
        <TaskContent task={taskLable} status={taskStatus} />
      </div>
    </div>
  );
}
export default TasksForm;
