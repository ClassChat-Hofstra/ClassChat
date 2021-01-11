import React from "react";
import { Card } from "react-bootstrap";

export default function Course(props) {
  return (
    <div>
      <Card style={{ width: "18rem", marginBottom: "25px" }}>
        <Card.Body>
          <Card.Title>CSC-005</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Section: A
          </Card.Subtitle>
          <Card.Text>
            (CS) Overview - Computer SCI
          </Card.Text>
          <Card.Link href="#">Add to your courses</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}
