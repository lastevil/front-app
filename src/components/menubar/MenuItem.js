import "./MenuItem.css";
function MenuItem(props) {
  const title = props.title;

  function clickHandler() {
    props.onClickHandler(title);
  }

  return (
    <div className="div__menu__item" onClick={clickHandler}>
      {title}
    </div>
  );
}
export default MenuItem;
