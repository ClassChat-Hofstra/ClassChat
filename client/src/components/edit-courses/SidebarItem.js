import React from "react";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { removeCourse } from "../../actions";

export default function SidebarItem(props) {
  const dispatch = useDispatch();

  function onClickRemove(e) {
    e.preventDefault();
    dispatch(removeCourse(props.crn));
  }

  return (
    <div>
      <li class="nav-item">
        <p class="nav-link">
          <span data-feather="home"></span>
          {props.title}
          <span style={{ float: "right", color: "red" }}>
            <FontAwesomeIcon onClick={onClickRemove} icon={faMinusCircle} />
          </span>
        </p>
      </li>
    </div>
  );
}
