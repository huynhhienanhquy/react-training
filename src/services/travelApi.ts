import axios, { AxiosError } from 'axios';

const travelApi = axios.create({
  baseURL: 'https://6a631d671bffb2ffab8bbbbe.mockapi.io',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (Optional: Attach token if needed)
travelApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
travelApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error)
);

export default travelApi;
