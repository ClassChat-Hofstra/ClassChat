import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removePin } from "../../../actions";

export default function PinnedPost(props) {
  console.log(props);
  const dispatch = useDispatch();

  function handleDelete() {
    console.log("called");
    dispatch(removePin({ crn: props.crn, messageObj: props.postObj }));
    axios
      .post("/courses/removepin", { crn: props.crn, id: props.postObj._id })
      .then(() => {
        console.log("success");
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(removePin({ crn: props.crn, messageObj: props.postObj }));
  }

  useEffect(() => {
    console.log("This reloaded");
  }, []);

  return (
    <div>
      <li
        style={{ border: "none", padding: "0.5rem 0.5rem" }}
        className="list-group-item"
      >
        <Card
          border="primary"
          style={{
            maxWidth: "300px",
            minWidth: "200px",
            maxHeight: "300px",
            overflowX: "auto",
          }}
        >
          <Card.Header>
            {props.name}{" "}
            <span style={{ float: "right" }}>
              <Button onClick={handleDelete} size="sm" variant="outline-danger">
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </span>
          </Card.Header>
          <Card.Body>
            <Card.Text>{props.body}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Card.Text>Pin expires in 7 days</Card.Text>
          </Card.Footer>
        </Card>
      </li>
    </div>
  );
}
