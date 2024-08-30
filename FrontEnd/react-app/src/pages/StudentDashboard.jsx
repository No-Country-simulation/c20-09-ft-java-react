import React from "react";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      <div className="dashboard-content">
        <section className="dashboard-section">
          <h2>Welcome, Student!</h2>
          <p>
            Here you can view your courses, track your progress, and manage your
            assignments.
          </p>
        </section>
        <section className="dashboard-actions">
          <button className="dashboard-button">View Courses</button>
          <button className="dashboard-button">Track Progress</button>
          <button className="dashboard-button">Manage Assignments</button>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
