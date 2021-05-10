import { useSelector } from "react-redux";

import React from "react";

export default function LoadClassmates() {
  const courseRoster = useSelector((state) => state.courseRoster);

  const classmateID = courseRoster.map((course) => {
    return course.users;
  });

  console.log(classmateID);

  return <div></div>;
}
