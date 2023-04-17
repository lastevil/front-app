import "./TaskCategory.css";
import React, { useState } from "react";
function TaskCategory(props) {
  var [usedClass, setUsedClass] = useState(props.classLable);

  function ClickedItem() {
    setUsedClass("taskCategoryItemClicked");
    props.setClass("taskCategoryItem");
  }

  return (
    <div className={usedClass} onClick={ClickedItem}>
      {props.lable}
    </div>
  );
}
export default TaskCategory;
