import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL, // 'http://localhost:8000' for local testing
});

export default api;