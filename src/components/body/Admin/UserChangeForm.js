import { useEffect, useState, useRef } from "react";
import SendRequest from "../../SendRequest";
import PasswordChecklist from "react-password-checklist";
import "./UserChangeForm.css";

function UserChangeForm(props) {
  var [depList, setDepList] = useState([]);
  const requestOptions = useRef();

  var [firstName, setFirstName] = useState(props.user.firstName);
  var [lastName, setLastName] = useState(props.user.lastName);
  var [email, setEmail] = useState(props.user.email);
  var [login, setLogin] = useState(props.user.login);
  var [password, setPassword] = useState("");
  var [passwordRep, setPasswordRep] = useState("");
  var [btnClass, setButtonClass] = useState("noactive-btn");
  var [btnEnable, setBtnEnable] = useState(true);
  var [departmentId, setDepartmentId] = useState(0);

  if (props.user.departmentId !== null) {
    setDepartmentId(props.user.departmentId);
    console.log(departmentId);
  }
  useEffect(() => {
    requestOptions.current = {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    SendRequest(requestOptions.current, "/auth/api/v1/departments").then(
      (result) => {
        if (result.message != null) {
          props.errorWindow(result.message);
        } else {
          setDepList(result);
        }
      }
    );
  }, []);
  //--------------- input handlers block -------------------
  function FirstNameHandler(event) {
    setFirstName(event.target.value);
  }
  function LastNameHandler(event) {
    setLastName(event.target.value);
  }
  function EmailHandler(event) {
    setEmail(event.target.value);
  }
  function PasswordHandler(event) {
    setPassword(event.target.value);
  }
  function PasswordRepHandler(event) {
    setPasswordRep(event.target.value);
  }
  function LoginHandler(event) {
    setLogin(event.target.value);
  }
  function DepartmentHandler(event) {
    const selectedIndex = event.target.options.selectedIndex;
    setDepartmentId(event.target.options[selectedIndex].getAttribute("id"));
  }
  //-------------- chenge data request ----------------
  function ChangeUserData() {
    props.setIsChange();
  }

  function ChangeDepartment() {
    requestOptions.current = {
      method: "Put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        userId: props.user.id,
        departmentId: departmentId,
      }),
    };
    SendRequest(
      requestOptions.current,
      "/auth/api/v1/users/departments/change"
    ).then((result) => {
      if (result.message != null) {
        props.errorWindow(result.message);
      } else {
        props.setIsChange();
      }
    });
  }

  function CancleChange() {
    props.setIsChange();
  }

  return (
    <div>
      <div className="user-change-blok">
        {props.textData[3]}
        <div className="user-info">
          <input
            onChange={FirstNameHandler}
            title={props.textData[5]}
            type="text"
            defaultValue={firstName}
          />
          <input
            onChange={LastNameHandler}
            title={props.textData[6]}
            type="text"
            defaultValue={lastName}
          />
          <input
            onChange={EmailHandler}
            title={props.textData[7]}
            type="email"
            defaultValue={email}
          />
          <input
            onChange={LoginHandler}
            title={props.textData[8]}
            type="text"
            defaultValue={login}
          />
          <button onClick={ChangeUserData} className="green-btn">
            {props.textData[1]}
          </button>
        </div>
      </div>
      <div className="user-change-blok">
        {props.textData[2]}
        <div className="user-info">
          <input onChange={PasswordHandler} type="password"></input>
          <input onChange={PasswordRepHandler} type="password"></input>
          <button
            disabled={btnEnable}
            onClick={ChangeUserData}
            className={btnClass}
          >
            {props.textData[1]}
          </button>
        </div>
        {password !== "" && (
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={5}
            value={password}
            valueAgain={passwordRep}
            onChange={(isValid) => {
              isValid === false && setButtonClass("noactive-btn");
              isValid === false && setBtnEnable(true);
              isValid === true && setButtonClass("green-btn");
              isValid === true && setBtnEnable(false);
            }}
          />
        )}
      </div>
      <div className="user-change-blok">
        {props.textData[4]}
        <div className="user-info">
          <select
            defaultValue={departmentId}
            onChange={DepartmentHandler}
            className="select__style"
          >
            {depList.map((department) => (
              <option key={department.id} id={department.id}>
                {department.title}
              </option>
            ))}
          </select>
          <button className="green-btn" onClick={ChangeDepartment}>
            {props.user.status === "NOT_ACTIVE"
              ? props.textData[1]
              : props.textData[0]}
          </button>
        </div>
        <div className="cancle-change-position">
          <button onClick={CancleChange} className="red-btn">
            {props.textData[9]}
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserChangeForm;
