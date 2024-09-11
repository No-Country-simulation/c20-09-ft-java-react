// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decodificar el token para obtener el rol
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
        setUserRole(
          decodedToken.authorities.includes("ROLE_ADMIN")
            ? "admin"
            : decodedToken.authorities.includes("ROLE_TEACHER")
            ? "teacher"
            : decodedToken.authorities.includes("ROLE_STUDENT")
            ? "student"
            : decodedToken.authorities.includes("ROLE_PARENT")
            ? "parent"
            : null
        );
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  return { isAuthenticated, userRole };
};

export default useAuth;
