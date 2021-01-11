import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function SearchBar() {
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

  return (
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
        ClassChat
      </a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      ></input>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" onClick={handleLogout}>
            Sign out
          </a>
        </li>
      </ul>
    </nav>
  );
}
