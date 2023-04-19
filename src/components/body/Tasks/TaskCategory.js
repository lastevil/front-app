import "./TaskCategory.css";
import React, { useEffect, useState } from "react";
function TaskCategory(props) {
  var [usedClass, setUsedClass] = useState(props.classLable);
  useEffect(() => {
    if (props.usedTask === props.lable) {
      setUsedClass("taskCategoryItemClicked");
    } else {
      setUsedClass("taskCategoryItem");
    }
  }, [props.usedTask]);

  function ClickedItem() {
    props.taskCategory(props.lable);
  }

  return (
    <div className={usedClass} onClick={ClickedItem}>
      {props.lable}
    </div>
  );
}
export default TaskCategory;
