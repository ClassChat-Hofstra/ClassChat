import React from "react";
import Navbar from "./SearchBar";
import Sidebar from "./Sidebar";

import CourseResults from "./CourseResults";

import { Col, Container, Row } from "react-bootstrap";
import SearchBar from "./SearchBar";

export default function EditCourses() {
  return (
    <div>
      <SearchBar />
      <Container>
        <Row>
          <Sidebar />
          <CourseResults />
        </Row>
      </Container>
    </div>
  );
}
