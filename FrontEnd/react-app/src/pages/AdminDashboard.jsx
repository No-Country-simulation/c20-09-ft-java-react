import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-content">
        <section className="dashboard-section">
          <h2>Welcome, Admin!</h2>
          <p>
            Here you can manage users, view system reports, and configure
            platform settings.
          </p>
        </section>
        <section className="dashboard-actions">
          <button className="dashboard-button">Manage Users</button>
          <button className="dashboard-button">View Reports</button>
          <button className="dashboard-button">System Settings</button>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
