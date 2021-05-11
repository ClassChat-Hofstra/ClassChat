import React from "react";
import { Card } from "react-bootstrap";

export default function VideoRec(props) {
  //console.log(props);
  return (
    <div>
      <li
        style={{ border: "none", padding: "0.5rem 0.5rem" }}
        className="list-group-item"
      >
        <Card border="primary">
          <Card.Header style={{ maxWidth: "466px" }}>{props.name}</Card.Header>
          <Card.Body>
            <Card.Text>
              <iframe
                title={props.embedHtml}
                width="426"
                height="240"
                src={props.embedHtml}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </Card.Text>
          </Card.Body>
        </Card>
      </li>
    </div>
  );
}
