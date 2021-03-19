import React, { Component, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Card, Alert, ResponsiveEmbed } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { loadCourses } from "../../actions";
import axios from "axios";

function Dashboard(props) {
  const dispatch = useDispatch();
  const courseRoster = useSelector((state) => state.courseRoster);

  const [hasNoCourses, setHasNoCourses] = useState(false);

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  async function loadCourses() {
    const response = await axios.post("/courses/currentcourses", {
      email: currentUser.email,
    });

    return response.data;
  }

  // useEffect(() => {
  //   dispatch(loadCourses(currentUser.email));
  // }, []);

  useEffect(() => {
    loadCourses().then((data) => {
      if (data.length < 1) {
        setHasNoCourses(true);
      }
    });
  }, []);

  useEffect(() => {
    console.log("Value: " + hasNoCourses);
    if (hasNoCourses === true) {
      history.replace("/edit-courses");
    }
  }, [hasNoCourses, history]);

  return (
    <div>
      <Card style={{ width: "18rem", margin: "auto" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
