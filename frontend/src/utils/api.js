import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
};

export const booksAPI = {
  getAll: (params) => api.get('/books', { params }),
  create: (data) => api.post('/books', data),
  update: (id, data) => api.put(`/books/${id}`, data),
  delete: (id) => api.delete(`/books/${id}`),
};

export const employeesAPI = {
  getAll: () => api.get('/employees'),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
};

export const transactionsAPI = {
  issue: (data) => api.post('/transactions/issue', data),
  return: (data) => api.post('/transactions/return', data),
};

export const reportsAPI = {
  getDashboard: () => api.get('/reports/dashboard'),
  getIssuedBooks: () => api.get('/reports/issued-books'),
  getAvailableBooks: () => api.get('/reports/available-books'),
  getHistory: (params) => api.get('/reports/history', { params }),
};

export default api;