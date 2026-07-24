import axios, { AxiosError } from 'axios';

// The baseURL points precisely to the Project Prefix on the MockAPI.
const api = axios.create({
  baseURL: 'https://6a6314591bffb2ffab8baf11.mockapi.io/flight',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically attach tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor: Handles feedback and normalizes errors.
api.interceptors.response.use(
  (response) => {
    // How to handle the case where the API returns 200 OK but the body contains the status === "error"
    if (response.data && response.data.status === 'error') {
      const errorMessage = response.data.message || 'Operation failed';
      return Promise.reject(new Error(errorMessage));
    }
    return response;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default api;
