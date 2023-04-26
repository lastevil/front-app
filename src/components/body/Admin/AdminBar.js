import "./AdminBar.css";
import React, { useEffect, useState } from "react";

function AdminBar(props) {
  var [usedClass, setUsedClass] = useState(props.classLable);
  useEffect(() => {
    if (props.usedCategory === props.lable) {
      setUsedClass("taskCategoryItemClicked");
    } else {
      setUsedClass("taskCategoryItem");
    }
  }, [props.usedCategory]);

  function ClickedItem() {
    props.selectCategory(props.lable);
  }

  return (
    <div className={usedClass} onClick={ClickedItem}>
      {props.lable}
    </div>
  );
}
export default AdminBar;
