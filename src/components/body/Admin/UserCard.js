import { useState } from "react";
import "./UserCard.css";
function UserCard(props) {
  var [isChange, setIsChange] = useState(false);

  function ActiveChangeUserData(event) {
    event.preventDefault();
    setIsChange(true);
  }
  function ChangeUserData(event) {
    event.preventDefault();
  }
  //ToDo: Сделать перенос строк для мобильного вида.
  return (
    <div>
      {isChange === false && (
        <div className="user-card-body">
          <div className="user-info">
            <div>{props.user.firstName}</div>
            <div>{props.user.lastName}</div>
            <div>{props.user.departmentTitle}</div>
            <div>{props.user.email}</div>
          </div>
          <div className="user-btn">
            <button onClick={ActiveChangeUserData} className="change-btn">
              Изменить
            </button>
          </div>
        </div>
      )}

      {isChange === true && (
        <div className="user-card-body">
          <div className="user-info">
            <input value={props.user.firstName} />
            <input value={props.user.lastName} />
            <input value={props.user.email} />
            <input value={props.user.lastName} />
            <div>{props.user.departmentTitle}</div>
            <div>{}</div>
          </div>
          <div className="user-btn">
            <button onClick={ChangeUserData} className="activation-btn">
              Активировать
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default UserCard;
