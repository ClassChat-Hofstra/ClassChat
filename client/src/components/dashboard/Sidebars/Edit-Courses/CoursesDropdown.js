import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { useAuth } from "../../../../contexts/AuthContext";
import { addCourse, removeCourse, unselectChat } from "../../../../actions";

import { useDispatch } from "react-redux";

const CoursesDropdown = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const { selectedChat } = useSelector((state) => state);

  function handleAdd(e) {
    // console.log(props.course.course_objecct);
    e.preventDefault();
    axios
      .post("/courses/addcourse", {
        email: currentUser.email,
        course: props.course,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(addCourse(res.data));
      })
      .catch((e) => console.log(e));
  }

  function handleRemove(e) {
    e.preventDefault();
    axios
      .post("/courses/removecourse", {
        email: currentUser.email,
        course: props.course,
      })
      .then(dispatch(removeCourse(props.course.crn)))
      .then(() => {
        if (selectedChat.crn === props.course.crn) {
          dispatch(unselectChat());
        }
      })
      .catch((e) => console.log(e));
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle tag="a">
        <i className="ti ti-more"></i>
      </DropdownToggle>
      <DropdownMenu>
        {props.searchResult ? (
          <DropdownItem onClick={handleAdd}>Add Course</DropdownItem>
        ) : (
          <DropdownItem onClick={handleRemove}>Delete Course</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CoursesDropdown;
