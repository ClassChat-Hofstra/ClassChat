import React from "react";
import SidebarItem from "./SidebarItem";
import { Col, ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const courses = useSelector((state) => state.courseRoster);

  function createSidebar(course) {
    return (
      <SidebarItem
        key={course._id}
        crn={course.crn}
        title={course.course_title}
      />
    );
  }

  return (
    <Col className="col-md-2 d-none d-md-block bg-light sidebar">
      <Nav>
        <div class="sidebar-sticky" style={{ width: "100%" }}>
          <ul class="nav flex-column">{courses.map(createSidebar)}</ul>
        </div>
      </Nav>
    </Col>
  );
}
