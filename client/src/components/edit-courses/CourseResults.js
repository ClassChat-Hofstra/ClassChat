import React, { useState, useEffect } from "react";
import { Card, CardDeck, Col } from "react-bootstrap";
import Course from "./Course";
import CourseData from "../../CourseData";
import axios from "axios";
import getCourseData from "../../CourseData";

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
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    getCourseData().then((response) => {
      setCourseList(response);
    });
  }, []);

  return (
    <div role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <CardDeck style={{ marginRight: "-40px" }}>
        {courseList.map(createCard)}
      </CardDeck>
    </div>
  );
}
