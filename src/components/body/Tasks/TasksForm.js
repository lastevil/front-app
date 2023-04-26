import Categorys from "../Categorys";
import TaskCategory from "./TaskCategory";
import TaskContent from "./TaskContent";
import TaskFilter from "./TaskFilter";
import "./TasksForm.css";
import React, { useState } from "react";
function TasksForm(props) {
  const categoryList = [
    "Мои задачи",
    "Задачи отдела",
    "Новые задачи",
    "Мои заявки",
  ];

  const statuses = [
    "Запланировано",
    "В работе",
    "Выполнено",
    "Принято",
    "Удалено",
    "Просрочено",
    "Осталось 3 дня",
    "Осталось 2 дня",
    "Истечет сегодня",
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
      <Categorys>
        {categoryList.map((category) => (
          <TaskCategory
            key={category}
            lable={category}
            usedTask={taskLable}
            taskCategory={setTaskCategory}
          />
        ))}
      </Categorys>

      <div className="filter">
        <TaskFilter statusList={statuses} setFilter={setStatusFilter} />
      </div>
      <div className="task_content">
        <TaskContent
          task={taskLable}
          status={taskStatus}
          categoryList={categoryList}
        />
      </div>
    </div>
  );
}
export default TasksForm;
