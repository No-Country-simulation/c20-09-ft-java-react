// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Importa jwt-decode

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("token"); // Obtén el token del almacenamiento local
  const location = useLocation(); // Obtén la ubicación actual

  if (!token) {
    // Si no hay token, redirige a la página de inicio de sesión
    return <Navigate to="/" state={{ from: location }} />;
  }

  // Si hay token, decodifícalo para obtener el rol
  try {
    const decodedToken = jwtDecode(token);
    const authorities = decodedToken.authorities || "";

    if (
      location.pathname === "/teacher-dashboard" &&
      !authorities.includes("ROLE_TEACHER")
    ) {
      return <Navigate to="/" />;
    } else if (
      location.pathname === "/student-dashboard" &&
      !authorities.includes("ROLE_STUDENT")
    ) {
      return <Navigate to="/" />;
    } else if (
      location.pathname === "/parent-dashboard" &&
      !authorities.includes("ROLE_PARENT")
    ) {
      return <Navigate to="/" />;
    } else if (
      location.pathname === "/admin" &&
      !authorities.includes("ROLE_ADMIN")
    ) {
      return <Navigate to="/" />;
    }

    // Si el rol es correcto o la ruta es pública, renderiza el contenido
    return <Outlet />;
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
