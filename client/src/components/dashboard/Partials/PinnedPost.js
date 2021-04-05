import React from "react";
import { Card } from "react-bootstrap";

export default function PinnedPost(props) {
  return (
    <div>
      <li
        style={{ border: "none", padding: "0.5rem 0.5rem" }}
        className="list-group-item"
      >
        <Card border="primary" /*style={{ width: "18rem" }} */>
          <Card.Header>{props.name}</Card.Header>
          <Card.Body>
            <Card.Text>{props.body}</Card.Text>
          </Card.Body>
        </Card>
      </li>
    </div>
  );
}
