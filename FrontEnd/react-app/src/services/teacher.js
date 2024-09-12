import axios from "axios";

const teacherService = axios.create({
  baseURL: "http://localhost:8080/evaluations", // URL base del backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token en cada petición si está disponible
teacherService.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Manejo de errores en el interceptor
  }
);

export default teacherService;
