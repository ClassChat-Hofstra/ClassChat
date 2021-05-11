import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { pinPost } from "../../../actions";
import { set } from "mongoose";
import axios from "axios";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export default function PinAction(props) {
  const [isPinned, setIsPinned] = useState(true);
  const dispatch = useDispatch();

  const forceUpdate = useForceUpdate();

  const selectedCourse = useSelector((state) => state.selectedChat);
  const courseRoster = useSelector((state) => state.courseRoster);

  function onPinClick(e) {
    e.preventDefault();
    axios
      .post("/courses/pinpost", { crn: props.crn, post: props.messageObject })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
    dispatch(pinPost({ messageObject: props.messageObject, crn: props.crn }));
  }

  // useEffect(() => {
  //   const currentCourse = courseRoster.find(
  //     (course) => course._crn === props.crn
  //   );
  //   if (currentCourse !== undefined) {
  //     currentCourse.pinnedPosts.forEach((post) => {
  //       if (post._id === props.messageObject._id) {
  //         setIsPinned(true);
  //       }
  //     });
  //   }
  // }, [selectedCourse.pinnedPosts]);

  // useEffect(() => {
  //   console.log(isPinned);
  // }, [isPinned]);

  // function isAlreadyPinned() {
  //   const pinnedPosts = selectedCourse.pinnedPosts;
  //   pinnedPosts.forEach((post) => {
  //     if (post._id === props.messageObject._id) {
  //       setIsPinned(true);
  //       return true;
  //     }
  //   });
  //   setIsPinned(false);
  //   return false;
  // }

  return (
    <div style={{ display: "inline-block" }}>
      <button
        onClick={onPinClick}
        style={{ border: "none", fontSize: "14px", margin: "0 5px" }}
      >
        {<FontAwesomeIcon icon={faThumbtack} />}
      </button>
    </div>
  );
}
