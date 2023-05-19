import { useState, useEffect, useRef } from "react";
import SendRequest from "../../SendRequest";
import Card from "../Card";
import "./DepartmentsControl.css";

function DepartmentsControl(props) {
  var depText;
  if (localStorage.getItem("language") === "rus") {
    depText = ["Отделы отсутствуют", "Добавить", "Название отдела"];
  } else {
    depText = ["Departments missing", "Add", "Department lable"];
  }

  var [depList, setDepList] = useState([]);
  var [newDepClick, setNewDepClick] = useState(false);
  var [depTitle, setDepTitle] = useState("");

  const requestGetOptions = useRef();

  requestGetOptions.current = {
    method: "Get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    SendRequest(requestGetOptions.current, "/auth/api/v1/departments").then(
      (result) => {
        if (result.message != null) {
          props.errorWindow(result.message);
        } else {
          setDepList(result);
        }
      }
    );
  }, [depList.length]);

  function depTitleHandler(event) {
    setDepTitle(event.target.value);
  }

  function newDepForm() {
    setNewDepClick(!newDepClick);
  }

  function addDepartment() {
    var requestPostOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: null,
        title: depTitle,
      }),
    };

    SendRequest(requestPostOptions, "/auth/api/v1/departments").then(
      (result) => {
        if (result !== undefined) {
          alert(result.message);
        }
      }
    );
    setDepList([]);
    newDepForm();
  }

  return (
    <div>
      {depList.length !== 0 ? (
        depList.map((dep) => <Card key={dep.id}>{dep.title}</Card>)
      ) : (
        <div className="empty-message">{depText[0]}</div>
      )}
      <div>
        {newDepClick === false && (
          <button className="blue-btn" onClick={newDepForm}>
            {depText[1]}
          </button>
        )}
        {newDepClick === true && (
          <div className="new-dep-form">
            <input
              type="text"
              className="inputDef"
              defaultValue={depText[2]}
              onChange={depTitleHandler}
            ></input>
            <button className="green-btn" onClick={addDepartment}>
              {depText[1]}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default DepartmentsControl;
