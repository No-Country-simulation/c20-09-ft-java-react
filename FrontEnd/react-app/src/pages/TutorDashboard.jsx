import React from "react";
import "./TutorDashboard.css";

const TutorDashboard = () => {
  return (
    <div className="tutor-dashboard">
      <h1>Tutor Dashboard</h1>
      <div className="dashboard-content">
        <section className="dashboard-section">
          <h2>Welcome, Tutor!</h2>
          <p>
            Here you can view your tutoring sessions, track student progress,
            and manage your schedule.
          </p>
        </section>
        <section className="dashboard-actions">
          <button className="dashboard-button">View Sessions</button>
          <button className="dashboard-button">Track Progress</button>
          <button className="dashboard-button">Manage Schedule</button>
        </section>
      </div>
    </div>
  );
};

export default TutorDashboard;
