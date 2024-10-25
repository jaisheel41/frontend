// frontend/src/services/api.js
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';

const api = axios.create({
    baseURL: `${backendUrl}/api/`,  // Base URL from environment variable
});

export default api;
