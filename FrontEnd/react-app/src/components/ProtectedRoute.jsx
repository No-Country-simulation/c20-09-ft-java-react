import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // Redirige a la página de inicio de sesión si no hay token
    return <Navigate to="/" state={{ from: location }} />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const authorities = decodedToken.authorities || "";
    const isPasswordResetRequired =
      decodedToken.isPasswordResetRequired || false;

    // Redirige a la página de restablecimiento de contraseña si es necesario
    if (isPasswordResetRequired && location.pathname !== "/reset-password") {
      return <Navigate to="/reset-password" />;
    }

    // Redirige a la página de inicio si el rol no coincide con la ruta
    const pathRoleMap = {
      "/teacher-dashboard": "ROLE_TEACHER",
      "/student-dashboard": "ROLE_STUDENT",
      "/parent-dashboard": "ROLE_PARENT",
      "/admin": "ROLE_ADMIN",
    };

    const requiredRole = pathRoleMap[location.pathname];
    if (requiredRole && !authorities.includes(requiredRole)) {
      return <Navigate to="/" />;
    }

    // Permite el acceso si todas las validaciones pasan
    return <Outlet />;
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
