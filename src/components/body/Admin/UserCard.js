import { useRef, useState } from "react";
import "./UserCard.css";
import UserChangeForm from "./UserChangeForm";
function UserCard(props) {
  var textData = useRef();

  if (localStorage.getItem("language") === "rus") {
    textData.current = [
      "Активировать",
      "Изменить",
      "Изменить пароль:",
      "Данные пользователя:",
      "Настройка департамента:",
      "Имя",
      "Фамилия",
      "email",
      "Логин",
      "Отмена",
    ];
  } else {
    textData.current = [
      "Activate",
      "Change",
      "Change password:",
      "User data",
      "Department settings",
      "First name",
      "Second name",
      "email",
      "login",
      "Cancle",
    ];
  }

  var [isChange, setIsChange] = useState(false);

  function ChangeFormOpen() {
    setIsChange(!isChange);
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
            <button onClick={ChangeFormOpen} className="blue-btn">
              {textData.current[1]}
            </button>
          </div>
        </div>
      )}
      {isChange === true && (
        <UserChangeForm
          errorWindow={props.errorWindow}
          setIsChange={ChangeFormOpen}
          user={props.user}
          textData={textData.current}
        ></UserChangeForm>
      )}
    </div>
  );
}
export default UserCard;
