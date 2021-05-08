import React, { useEffect } from "react";
import SidebarIndex from "./Sidebars/index";
import Navigation from "./Navigation";
import Profile from "./Sidebars/Profile";
import Chat from "./Partials/Chat";
import DisconnectedModal from "./Modals/DisconnectedModal";
import { useDispatch, useSelector } from "react-redux";
import getCourseData from "../../CourseData";
import { useAuth } from "../../contexts/AuthContext";
import {
  loadCourses,
  loadInitialCourses,
  updateCurrentUser,
} from "../../actions";
import axios from "axios";
import io from "socket.io-client";

function Layout() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const socket = useSelector((state) => state.socket);

  useEffect(() => {
    document.querySelector("*").addEventListener("click", (e) => {
      if (
        document.body.classList.contains("navigation-open") &&
        e.target.nodeName === "BODY"
      ) {
        document.body.classList.remove("navigation-open");
      }
    });

    getCourseData().then((response) => {
      dispatch(loadInitialCourses(response));
    });

    axios
      .post("/courses/currentcourses", { email: currentUser.email })
      .then((res) => {
        const rooms = res.data.map((course) => course.crn);
        console.log(rooms);
        socket.emit("subscribe", rooms);
        dispatch(loadCourses(res.data));
      });

    axios
      .post("/auth/currentuser", { email: currentUser.email })
      .then((res) => {
        console.log(res.data);
        dispatch(updateCurrentUser(res.data));
      });
  }, []);

  return (
    <div className="layout">
      <Navigation />
      <div className="content">
        <SidebarIndex />
        <Chat />
        <Profile />
        <DisconnectedModal />
      </div>
    </div>
  );
}

export default Layout;
