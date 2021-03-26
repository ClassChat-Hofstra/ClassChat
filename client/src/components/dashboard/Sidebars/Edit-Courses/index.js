import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import CoursesDropdown from "./CoursesDropdown";
import { sidebarAction } from "../../../../actions";
import { mobileSidebarAction } from "../../../../actions";
import { selectedChatAction } from "../../../../actions";
import { loadInitialCourses } from "../../../../actions";

import axios from "axios";

function Index() {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const [searchState, setSearchState] = useState(false);

  async function handleSearch() {
    await axios
      .post("/courses/searchcourses", { query: inputRef.current.value })
      .then((res) => {
        dispatch(loadInitialCourses(res.data));
      });
  }

  useEffect(() => {
    inputRef.current.focus();
  });

  function handleChange() {
    if (inputRef.current.value.length > 0) {
      setSearchState(true);
      handleSearch();
    } else {
      setSearchState(false);
    }
  }

  const courseList = useSelector((state) => state.courseList);
  const courseRoster = useSelector((state) => state.courseRoster);

  function createListItem(courseData) {
    return (
      <CourseListView
        key={courseData.crn}
        crn={courseData.crn}
        course_title={courseData.course_title}
        subject={courseData.subject}
        course_number={courseData.course_number}
        course_section={courseData.course_section}
        course_object={courseData}
      />
    );
  }

  const CourseListView = (props) => {
    //console.log(props);
    return (
      <li className={"list-group-item "}>
        <div className="users-list-body">
          <h5>
            {props.subject}-{props.course_number}: {props.course_title}
          </h5>
          Section: {props.course_section} | CRN: {props.crn}
          <div className="users-list-action action-toggle">
            <CoursesDropdown course={props} searchResult={searchState} />
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="sidebar active">
      <header>
        <span>Manage Courses</span>
      </header>
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search for courses"
          onChange={handleChange}
          ref={inputRef}
        />
      </form>
      <div className="sidebar-body">
        <PerfectScrollbar>
          <ul className="list-group list-group-flush">
            {searchState
              ? courseList.map(createListItem)
              : courseRoster.map(createListItem)}
          </ul>
        </PerfectScrollbar>
      </div>
    </div>
  );
}

export default Index;
