import React from "react";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { removeCourse } from "../../actions";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export default function SidebarItem(props) {
  console.log(props);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  function onClickRemove(e) {
    e.preventDefault();
    axios
      .post("/courses/removecourse", {
        email: currentUser.email,
        crn: props.course.crn,
      })
      .then(dispatch(removeCourse(props.course.crn)))
      .catch((e) => console.log(e));
  }

  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) : str;
  }

  let truncCourseString = truncate(
    props.course.subject +
      "-" +
      props.course.course_number +
      ":" +
      props.course.course_title,
    35
  );
  //{props.course.subject}-{props.course.course_number}:{props.course.course_title}
  return (
    <div>
      <li className="nav-item">
        <table className="nav-link">
          <colgroup>
            <col style={{ width: "80%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <tr>
            <td data-feather="home">
              {props.course.subject}-{props.course.course_number}:{" "}
              {props.course.course_title}
            </td>
            <td style={{ color: "red", textAlign: "right" }}>
              <FontAwesomeIcon onClick={onClickRemove} icon={faMinusCircle} />
            </td>
          </tr>
        </table>
      </li>
      <hr />
    </div>
  );
}
