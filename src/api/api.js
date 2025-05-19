import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

// Funciones
export const loginUser = async (email, password) =>
    api.post('/auth/login', { email, contraseña: password });

export const fetchTasks = (token, filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return api.get(`/tasks?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const createTask = (task, token) =>
    api.post('/tasks', task, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const deleteTask = (id, token) =>
    api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const updateTask = (task, token) =>
    api.put(`/tasks/${task.id}`, task, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

export default api;
