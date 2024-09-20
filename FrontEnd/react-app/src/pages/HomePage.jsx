// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa Link y useNavigate
import {jwtDecode} from "jwt-decode"; // Importa jwt-decode

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate(); // Usa useNavigate para redirigir

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const authorities = decodedToken.authorities || "";

        setIsAuthenticated(true);

        // Establece el rol del usuario
        if (authorities.includes("ROLE_TEACHER")) {
          setUserRole("ROLE_TEACHER");
        } else if (authorities.includes("ROLE_STUDENT")) {
          setUserRole("ROLE_STUDENT");
        } else if (authorities.includes("ROLE_PARENT")) {
          setUserRole("ROLE_PARENT");
        } else if (authorities.includes("ROLE_ADMIN")) {
          setUserRole("ROLE_ADMIN");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleDashboardRedirect = () => {
    switch (userRole) {
      case "ROLE_TEACHER":
        navigate("/teacher-dashboard");
        break;
      case "ROLE_STUDENT":
        navigate("/student-dashboard");
        break;
      case "ROLE_PARENT":
        navigate("/parent-dashboard");
        break;
        case "ROLE_ADMIN":
          navigate("/ADMIN-dashboard");
          break;
      default:
        navigate("/");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Bienvenido al Sistema de Gestión Académica</h1>
      <p>Seleccione una opción para comenzar:</p>
      <div style={styles.buttonContainer}>
        {isAuthenticated ? (
          <button onClick={handleDashboardRedirect} style={styles.button}>
            Ir al Dashboard
          </button>
        ) : (
          <>
            <Link to="/login" style={styles.button}>
              Iniciar Sesión
            </Link>
            {/* <Link to="/register" style={styles.button}>
              Registrar
            </Link> */}
          </>
        )}
      </div>
    </div>
  );
};

// Estilos opcionales para la página
const styles = {

  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#34495e",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    display: "inline-block",
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    textDecoration: "none",
    color: "white",
    backgroundColor: "#e67e22",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default HomePage;
