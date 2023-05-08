import { useState, useEffect } from "react";
import Card from "../Card";
import SendRequest from "../../SendRequest";
import UserCard from "./UserCard";
import "./UserActivation.css";

function UserActivation(props) {
  const requestGetOptions = {
    method: "Get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  var url;

  var optionList;

  if (localStorage.getItem("language") === "rus") {
    optionList = ["все", "активные", "не активные"];
  } else {
    optionList = ["all", "active", "not active"];
  }

  var [userList, setUserList] = useState([]);
  var [filter, setFilter] = useState(optionList[0]);

  function selectHeader(event) {
    event.preventDefault();
    setFilter(event.target.value);
  }

  useEffect(() => {
    if (filter === optionList[0]) {
      url = "http://localhost:8701/auth/api/v1/users";
      SendRequest(requestGetOptions, url).then((result) => setUserList(result));
    }
    if (filter === optionList[1]) {
      url = "http://localhost:8701/auth/api/v1/users/active";
      SendRequest(requestGetOptions, url).then((result) => setUserList(result));
    }
    if (filter === optionList[2]) {
      url = "http://localhost:8701/auth/api/v1/users/not_active";
      SendRequest(requestGetOptions, url).then((result) => setUserList(result));
    }
  }, [filter]);

  return (
    <div className="user-form-body">
      <div>
        <select className="select_filter" onChange={selectHeader}>
          {optionList.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        {userList.length > 0 ? (
          userList.map((user) => (
            <Card key={user.id}>
              <UserCard user={user}></UserCard>
            </Card>
          ))
        ) : (
          <div>Таких пользователей нет</div>
        )}
      </div>
    </div>
  );
}
export default UserActivation;
