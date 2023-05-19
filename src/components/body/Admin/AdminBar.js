import "./AdminBar.css";
import React, { useEffect, useState } from "react";

function AdminBar(props) {
  var [usedClass, setUsedClass] = useState(props.classLable);
  var lable = props.lable;
  var currentCategory = props.usedCategory;
  useEffect(() => {
    if (props.usedCategory === lable) {
      setUsedClass("taskCategoryItemClicked");
    } else {
      setUsedClass("taskCategoryItem");
    }
  }, [currentCategory]);

  function ClickedItem() {
    props.selectCategory(lable);
  }

  return (
    <div className={usedClass} onClick={ClickedItem}>
      {lable}
    </div>
  );
}
export default AdminBar;
