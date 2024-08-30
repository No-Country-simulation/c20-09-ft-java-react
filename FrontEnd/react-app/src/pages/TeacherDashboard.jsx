import React from "react";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  return (
    <div className="teacher-dashboard">
      <h1>Teacher Dashboard</h1>
      <div className="dashboard-content">
        <section className="dashboard-section">
          <h2>Welcome, Teacher!</h2>
          <p>
            Here you can manage your classes, review student performance, and
            update assignments.
          </p>
        </section>
        <section className="dashboard-actions">
          <button className="dashboard-button">Manage Classes</button>
          <button className="dashboard-button">Review Performance</button>
          <button className="dashboard-button">Update Assignments</button>
        </section>
      </div>
    </div>
  );
};

export default TeacherDashboard;
