import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jaisheel42.pythonanywhere.com/api/', // Base URL for the Django backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
