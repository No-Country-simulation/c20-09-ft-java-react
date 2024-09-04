import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import useAuth from "./hooks/useAuth";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute"; // Importa el componente ProtectedRoute
import "./styles/App.css";

const App = () => {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Ruta para la página de inicio */}
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Ruta protegida para los dashboards */}
        <Route element={<ProtectedRoute />}>
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
