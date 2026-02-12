import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const generateSpec = async (data: any) => {
    const response = await api.post('/generate', data);
    return response.data;
};

export const getHistory = async () => {
    const response = await api.get('/history');
    return response.data;
};

export const getStatus = async () => {
    const response = await api.get('/status');
    return response.data;
};

export default api;
