import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import axios from "axios";
import { useAuth } from "../../../../contexts/AuthContext";
import { addCourse, removeCourse } from "../../../../actions";

import { useDispatch } from "react-redux";

const CoursesDropdown = (props) => {
  //console.log(props);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  function handleAdd(e) {
    e.preventDefault();
    axios
      .post("/courses/addcourse", {
        email: currentUser.email,
        course: props.course,
      })
      .then(dispatch(addCourse(props.course)))
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
