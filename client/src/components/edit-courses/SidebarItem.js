import React from "react";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { removeCourse } from "../../actions";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export default function SidebarItem(props) {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  function onClickRemove(e) {
    e.preventDefault();
    axios
      .post("/courses/removecourse", {
        email: currentUser.email,
        crn: props.crn,
      })
      .then(dispatch(removeCourse(props.crn)))
      .catch((e) => console.log(e));
  }

  return (
    <div>
      <li className="nav-item">
        <p className="nav-link">
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
