// src/services/resetService.js
import reset from "./reset";
// Solicitar el enlace para restablecimiento de contraseña
export const forgotPassword = async (email) => {
  try {
    const response = await reset.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.error(
      "Error requesting password reset:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Finalizar el restablecimiento de contraseña
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await reset.post("/reset_password", {
      token,
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error resetting password:",
      error.response?.data || error.message
    );
    throw error;
  }
};
