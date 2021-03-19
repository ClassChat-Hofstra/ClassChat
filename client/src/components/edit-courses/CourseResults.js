import React, { useState, useEffect } from "react";
import { CardDeck } from "react-bootstrap";
import Course from "./Course";
import axios from "axios";
import getCourseData from "../../CourseData";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { loadCourses, loadInitialCourses } from "../../actions";
import Fab from "@material-ui/core/Fab";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";

function createCard(courseData) {
  return (
    <Course
      key={courseData._id}
      crn={courseData.crn}
      title={courseData.course_title}
      subject={courseData.subject}
      course_number={courseData.course_number}
      course_section={courseData.course_section}
      course_object={courseData}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  continueButton: {
    color: "white",
    backgroundColor: "#1fd1f9",
    backgroundImage: "linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%)",
    position: "fixed",
    right: "5%",
    bottom: "5%",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function CourseResult() {
  const classes = useStyles();
  const { currentUser } = useAuth();

  const courseList = useSelector((state) => state.courseList);
  const courseRoster = useSelector((state) => state.courseRoster);

  const [continueButton, setContinueVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getCourseData().then((response) => {
      dispatch(loadInitialCourses(response));
    });

    dispatch(loadCourses(currentUser.email));
  }, []);

  useEffect(() => {
    if (courseRoster.length > 0) {
      setContinueVisible(true);
    } else {
      setContinueVisible(false);
    }
  }, [courseRoster]);

  return (
    <div>
      <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <CardDeck style={{ marginRight: "-40px" }}>
          {courseList.map(createCard)}
        </CardDeck>
      </div>
      {continueButton && (
        <Link to="/home">
          {" "}
          <Fab variant="extended" className={classes.continueButton}>
            <DoneIcon className={classes.extendedIcon} />
            Continue
          </Fab>
        </Link>
      )}
    </div>
  );
}
