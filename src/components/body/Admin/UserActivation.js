import { useState, useEffect, useRef } from "react";
import Card from "../Card";
import SendRequest from "../../SendRequest";
import UserCard from "./UserCard";
import "./UserActivation.css";

function UserActivation(props) {
  const requestGetOptions = useRef();
  requestGetOptions.current = {
    method: "Get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  var url = useRef("");
  var optionList = useRef([]);

  if (localStorage.getItem("language") === "rus") {
    optionList.current = ["все", "активные", "не активные"];
  } else {
    optionList.current = ["all", "active", "not active"];
  }

  var [userList, setUserList] = useState([]);
  var [filter, setFilter] = useState(optionList.current[0]);
  var [isChange, setIsChange] = useState(true);

  function selectHeader(event) {
    event.preventDefault();
    setFilter(event.target.value);
  }

  useEffect(() => {
    if (filter === optionList.current[0]) {
      url.current = "/auth/api/v1/users";
      SendRequest(requestGetOptions.current, url.current).then((result) => {
        if (result.message != null) {
          props.errorWindow(result.message);
        } else {
          setUserList(result);
        }
      });
    }
    if (filter === optionList.current[1]) {
      url.current = "/auth/api/v1/users/active";
      SendRequest(requestGetOptions.current, url.current).then((result) => {
        if (result.message != null) {
          props.errorWindow(result.message);
        } else {
          setUserList(result);
        }
      });
    }
    if (filter === optionList.current[2]) {
      url.current = "/auth/api/v1/users/not_active";
      SendRequest(requestGetOptions.current, url.current).then((result) => {
        if (result.message != null) {
          props.errorWindow(result.message);
        } else {
          setUserList(result);
        }
      });
    }
  }, [filter, isChange]);

  function userChangeHandler() {
    setIsChange(!isChange);
  }

  return (
    <div className="user-form-body">
      <div>
        <select className="select_filter" onChange={selectHeader}>
          {optionList.current.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        {userList.length > 0 ? (
          userList.map((user) => (
            <Card
              key={user.id}
              className={
                (user.status === "NOT_ACTIVE" && "card-not-active") ||
                (user.status === "DELETED" && "card-deleted")
              }
            >
              <UserCard
                user={user}
                userChanged={userChangeHandler}
                errorWindow={props.errorWindow}
              ></UserCard>
            </Card>
          ))
        ) : (
          <div className="empty-message">Таких пользователей нет</div>
        )}
      </div>
    </div>
  );
}
export default UserActivation;
