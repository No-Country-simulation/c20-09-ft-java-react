import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";

import "../src/styles/App.css";

// Decodificar token (dummy function, implement it based on your needs)
const decodeToken = (token) => {
  // Implement token decoding logic
  return { role: "ADMIN" }; // Example return
};

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem("token", token); // Guardar el token en localStorage
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const userData = decodeToken(storedToken);
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "ADMIN":
          navigate("/admin-dashboard");
          break;
        case "TEACHER":
          navigate("/teacher-dashboard");
          break;
        case "STUDENT":
          navigate("/student-dashboard");
          break;
        case "TUTOR":
          navigate("/tutor-dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <>
      {user && <Navbar user={user} />}
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/admin-dashboard"
          element={
            user?.role === "ADMIN" ? (
              <AdminDashboard />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            user?.role === "TEACHER" ? (
              <TeacherDashboard />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/student-dashboard"
          element={
            user?.role === "STUDENT" ? (
              <StudentDashboard />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/tutor-dashboard"
          element={
            user?.role === "TUTOR" ? (
              <TutorDashboard />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
