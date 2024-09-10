import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ResetPassword from "./components/ResetPassword";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // Importa el componente ProtectedRoute
import "./styles/App.css";

const App = () => {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Ruta para la página de inicio */}
        <Route path="/" element={<LoginPage />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/reset_password" element={<ResetPassword />} />


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
