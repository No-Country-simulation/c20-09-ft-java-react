import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Navbar({ user }) {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        {user?.role === "ADMIN" && (
            <li className="nav-item">
              <Link to="/admin-dashboard" aria-label="Admin Dashboard">
                Admin Dashboard
              </Link>
            </li>
        )}
        {user?.role === "TEACHER" && (
          <li className="nav-item">
            <Link to="/teacher-dashboard" aria-label="Teacher Dashboard">
              Teacher Dashboard
            </Link>
          </li>
        )}
        {user?.role === "STUDENT" && (
          <li className="nav-item">
            <Link to="/student-dashboard" aria-label="Student Dashboard">
              Student Dashboard
            </Link>
          </li>
        )}
        {user?.role === "TUTOR" && (
          <li className="nav-item">
            <Link to="/tutor-dashboard" aria-label="Tutor Dashboard">
              Tutor Dashboard
            </Link>
          </li>
        )}
        <li className="nav-item">
          <span>Welcome, {user?.role}</span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
