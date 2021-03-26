import React, { useEffect } from "react";
import SidebarIndex from "./Sidebars/index";
import Navigation from "./Navigation";
import Profile from "./Sidebars/Profile";
import Chat from "./Partials/Chat";
import DisconnectedModal from "./Modals/DisconnectedModal";
import { useDispatch, useSelector } from "react-redux";
import getCourseData from "../../CourseData";
import { useAuth } from "../../contexts/AuthContext";
import { loadCourses, loadInitialCourses } from "../../actions";

function Layout() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

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

    dispatch(loadCourses(currentUser.email));
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
