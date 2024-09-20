// src/services/authService.js
import auth from "./auth";

// Inicio de sesión
export const loginUser = async (loginData) => {
  try {
    const response = await auth.post("/login", loginData);
    console.log(response.data);
    // Guardar el token en el almacenamiento local para futuras solicitudes
    sessionStorage.setItem("name", response.data.name);
    sessionStorage.setItem("dni", response.data.dni);
    sessionStorage.setItem("token", response.data.token);
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
    sessionStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error(
      "Error refreshing token:",
      error.response?.data || error.message
    );
    throw error;
  }
};
