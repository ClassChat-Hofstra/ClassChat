import React from "react";
import SidebarItem from "./SidebarItem";
import { Col, ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const courses = useSelector((state) => state.courseRoster);

  function createSidebar(course) {
    return <SidebarItem key={course._id} course={course} />;
  }

  return (
    <Col className="col-md-2 d-none d-md-block bg-light sidebar">
      <Nav>
        <div className="sidebar-sticky" style={{ width: "100%" }}>
          <ul className="nav flex-column">{courses.map(createSidebar)}</ul>
        </div>
      </Nav>
    </Col>
  );
}
