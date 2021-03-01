import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadInitialCourses } from "../../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
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

  const searchRef = useRef();

  async function handleSearch() {
    await axios
      .post("/courses/searchcourses", { query: searchRef.current.value })
      .then((res) => {
        dispatch(loadInitialCourses(res.data));
      });
  }

  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/home">
        ClassChat
      </a>
      <input
        className="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
        ref={searchRef}
        onChange={handleSearch}
      ></input>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="/home" onClick={handleLogout}>
            Sign out
          </a>
        </li>
      </ul>
    </nav>
  );
}
