// src/services/authService.js
import auth from "./auth";

// Registro de usuario
export const registerUser = async (userData) => {
  try {
    const response = await auth.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Inicio de sesión
export const loginUser = async (loginData) => {
  try {
    const response = await auth.post("/login", loginData);
    // Guardar el token en el almacenamiento local para futuras solicitudes
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

// Renovación de token
export const refreshToken = async (refreshToken) => {
  try {
    const response = await auth.post("/refresh-token", { refreshToken });
    // Actualizar el token en el almacenamiento local
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error(
      "Error refreshing token:",
      error.response?.data || error.message
    );
    throw error;
  }
};
