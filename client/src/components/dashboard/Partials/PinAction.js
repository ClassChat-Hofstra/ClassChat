import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { pinPost } from "../../../actions";

export default function PinAction(props) {
  const dispatch = useDispatch();

  function onPinClick(e) {
    e.preventDefault();
    dispatch(pinPost({ messageObject: props.messageObject, crn: props.crn }));
  }

  return (
    <div style={{ display: "inline-block" }}>
      <button
        onClick={onPinClick}
        style={{ border: "none", fontSize: "14px", margin: "0 5px" }}
      >
        <FontAwesomeIcon icon={faThumbtack} />
      </button>
    </div>
  );
}
