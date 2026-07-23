import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'https://travel-login.free.beeceptor.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Tự động đính Token
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

// 💡 BỔ SUNG: Response Interceptor xử lý lỗi status từ Beeceptor
api.interceptors.response.use(
  (response) => {
    // Nếu Beeceptor trả về HTTP 200 nhưng body chứa status === "error"
    if (response.data && response.data.status === 'error') {
      const errorMessage = response.data.message || 'Invalid email or password';
      return Promise.reject(new Error(errorMessage));
    }
    return response;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default api;
