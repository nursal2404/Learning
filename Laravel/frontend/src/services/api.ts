import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: false, // Set true jika menggunakan session/cookies
    });

    // Interceptor untuk logging
    api.interceptors.request.use(
    (config) => {
        console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
    );

    api.interceptors.response.use(
    (response) => {
        console.log(`✅ Response ${response.status}:`, response.data);
        return response;
    },
    (error) => {
        console.error('❌ API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
    );

    // User
    export const getUsers = () => api.get('/users');
    export const getUser = (id: number) => api.get(`/users/${id}`);
    export const createUser = (data: { name: string; email: string }) => api.post('/users', data);
    export const updateUser = (id: number, data: { name?: string; email?: string }) =>
    api.put(`/users/${id}`, data);
    export const deleteUser = (id: number) => api.delete(`/users/${id}`);

export default api;