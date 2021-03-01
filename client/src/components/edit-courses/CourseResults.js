import React, { useState, useEffect } from "react";
import { CardDeck } from "react-bootstrap";
import Course from "./Course";
import axios from "axios";
import getCourseData from "../../CourseData";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { loadCourses } from "../../actions";

function createCard(courseData) {
  return (
    <Course
      key={courseData._id}
      crn={courseData.crn}
      title={courseData.course_title}
      subject={courseData.subject}
      course_Number={courseData.course_number}
      course_section={courseData.course_section}
      course_object={courseData}
    />
  );
}

export default function CourseResult() {
  const { currentUser } = useAuth();
  const [courseList, setCourseList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getCourseData().then((response) => {
      setCourseList(response);
    });

    axios
      .post("/courses/currentcourses", { email: currentUser.email })
      .then((response) => {
        dispatch(loadCourses(response.data));
      })
      .catch((error) => console.log(error));
  }, [currentUser.email, dispatch]);

  return (
    <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <CardDeck style={{ marginRight: "-40px" }}>
        {courseList.map(createCard)}
      </CardDeck>
    </div>
  );
}
