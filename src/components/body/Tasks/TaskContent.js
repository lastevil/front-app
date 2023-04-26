import React, { useState, useEffect } from "react";
import Card from "../Card";

function TaskContent(props) {
  var [tiketList, setTiketList] = useState([]);
  var [page, setPage] = useState(1);
  var [pageCount, setPageCount] = useState(0);
  var [size, setSize] = useState(10);

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      page: page,
      size: size,
    }),
  };

  function sendRequest() {
    fetch("http://localhost:8701/api/v1/tickets/status/", requestOptions)
      .then((response) => {
        if ((response.status >= 500) & !response.ok) {
          alert(response.statusText);
          throw new Error(response.statusText);
        } else return response.json();
      })
      .then((data) => {
        if (data.token == null) {
          if (data.message != null) {
            alert(data.message);
            throw new Error(data.message);
          }
        } else setPageCount(data.json().totalPages);
      });
  }

  useEffect(() => {
    if (props.categoryList.includes(props.task)) {
      if (props.task === props.categoryList[0]) {
        setTiketList([1]);
      }
      if (props.task === props.categoryList[1]) {
        setTiketList([1, 2]);
      }
      if (props.task === props.categoryList[2]) {
        setTiketList([1, 2, 3]);
      }
      if (props.task === props.categoryList[3]) {
        setTiketList([1, 2, 3, 4]);
      }
    } else {
      setTiketList([]);
    }
  }, [props.task]);
  return (
    <div>
      {tiketList.map((tiket) => (
        <Card key={tiket}>1</Card>
      ))}
    </div>
  );
}
export default TaskContent;
