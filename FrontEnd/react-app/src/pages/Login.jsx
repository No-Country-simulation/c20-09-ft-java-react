import React, { useState } from "react";
import { authenticateUser } from "../mockData/mockData";
import "./Login.css";
import logo from "../assets/logoSchoolManager.png";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(""); // Limpiar errores anteriores

    // Autenticar al usuario usando la función del mock
    const result = authenticateUser(email, password);

    if (result) {
      const { user, token } = result;
      console.log("Token generado:", token);
      // Llama a la función onLogin con el usuario y el token
      onLogin(user, token);
    } else {
      setError("Email o contraseña incorrectos"); // Manejo de errores
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <h2>Iniciar sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // placeholder="Ingresa tu email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <div className="forgot-password">
          <a>¿Olvidaste tu contraseña?</a>
        </div>
        <div className="button-group">
          <button type="submit" className="login-btn">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
