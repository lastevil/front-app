import React, { useEffect, useState } from "react";
import "./TaskFilter.css";

function TaskFilter(props) {
  var [status, setStatus] = useState(props.statusList[0]);
  var [countElem, setCountElem] = useState(15);

  useEffect(() => {
    setCountElem(countElem);
    setStatus(status);
  }, [status, countElem]);

  function SubmitHandler(event) {
    event.preventDefault();
    props.setFilter(event.target.value);
  }

  return (
    <form onChange={SubmitHandler}>
      <div className="filter_form">
        Task status:&nbsp;
        <select>
          {props.statusList.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
export default TaskFilter;
