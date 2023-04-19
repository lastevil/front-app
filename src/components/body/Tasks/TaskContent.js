import React, { useState, useEffect } from "react";
import Card from "../Card";

function TaskContent(props) {
  var [tiketList, setTiketList] = useState([]);
  function MyTaskRequest() {}

  useEffect(() => {
    if (props.task === "My tasks") {
      setTiketList([1, 2]);
    } else {
      setTiketList([3, 4, 5]);
    }
  }, [props.task]);
  return (
    <div>
      {tiketList.map((tiket) => (
        <Card key={tiket} />
      ))}
    </div>
  );
}
export default TaskContent;
