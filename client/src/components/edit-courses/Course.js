import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, removeCourse } from "../../actions";

export default function Course(props) {
  const courses = useSelector((state) => state.courseRoster);

  const courseAdded = courses.some(
    (course) => course.crn === props.course_object.crn
  );

  const dispatch = useDispatch();

  function handleAdd(e) {
    e.preventDefault();
    console.log(props.course_object);
    dispatch(addCourse(props.course_object));
  }

  function handleRemove(e) {
    e.preventDefault();
    dispatch(removeCourse(props.course_object.crn));
  }

  return (
    <div>
      <Card style={{ width: "18rem", marginBottom: "25px" }}>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Section: {props.course_section}
          </Card.Subtitle>
          <Card.Text>{props.course_title}</Card.Text>
          {courseAdded ? (
            <Card.Link style={{ color: "red" }} href="" onClick={handleRemove}>
              Remove from your courses
            </Card.Link>
          ) : (
            <Card.Link href="" onClick={handleAdd}>
              Add to your courses
            </Card.Link>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
