import React from "react";
import { Card } from "react-bootstrap";

export default function WebRec(props) {
  return (
    <div>
      <li
        style={{ border: "none", padding: "0.5rem 0.5rem" }}
        className="list-group-item"
      >
        <Card
          border="primary"
          style={{ maxWidth: "300px", maxHeight: "300px", overflowX: "auto" }}
        >
          <Card.Header>{props.name}</Card.Header>
          <Card.Body>
            <Card.Text>{props.body}</Card.Text>
            <hr></hr>
            <strong>
              <a href={props.url}>{props.url}</a>
            </strong>
          </Card.Body>
        </Card>
      </li>
    </div>
  );
}
