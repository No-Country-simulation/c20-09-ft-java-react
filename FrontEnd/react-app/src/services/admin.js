// src/api/axiosInstance.js
import axios from 'axios';

const adminService = axios.create({
  baseURL: 'http://localhost:8080/admin/', // URL base del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token en cada petición si está disponible
adminService.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default adminService;
