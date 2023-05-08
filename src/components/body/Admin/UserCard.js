import "./UserCard.css";
function UserCard(props) {
  return (
    <div className="user-card-body">
      <div className="user-info">
        <div>{props.user.firstName}</div>
        <div>{props.user.lastName}</div>
        <div>{props.user.departmentTitle}</div>
        <div>{props.user.email}</div>
      </div>
      <div className="user-btn">
        <button className="change-btn">Изменить</button>
        <button className="activation-btn">Активировать</button>
      </div>
    </div>
  );
}
export default UserCard;
