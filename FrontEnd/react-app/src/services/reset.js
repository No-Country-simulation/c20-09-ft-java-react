// api.js
import axios from 'axios';

const reset = axios.create({
  baseURL: 'http://localhost:8080/api', // URL base del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token en cada petición si está disponible
reset.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default reset;
