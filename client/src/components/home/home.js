import React from "react";

import BigHeading from "./big-heading";
import LoginForm from "./LoginForm";

import "./home.css";
import { Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <Container fluid>
      <Row>
        <Col className="big-heading">
          <BigHeading/>
        </Col>
        <Col>
          <LoginForm className="login-form"/>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
