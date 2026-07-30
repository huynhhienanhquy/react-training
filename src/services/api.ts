import axios from 'axios';

const attachToken = (config: import('axios').InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const rejectError = (error: import('axios').AxiosError) => Promise.reject(error);

export const flightApi = axios.create({
  baseURL: 'https://6a6314591bffb2ffab8baf11.mockapi.io/flight',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

flightApi.interceptors.request.use(attachToken, rejectError);
flightApi.interceptors.response.use(
  (response) => {
    if (response.data && response.data.status === 'error') {
      return Promise.reject(new Error(response.data.message || 'Operation failed'));
    }
    return response;
  },
  rejectError
);

export const authApi = axios.create({
  baseURL: 'https://6a6321581bffb2ffab8bc359.mockapi.io/user',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

authApi.interceptors.request.use(attachToken, rejectError);

export const travelApi = axios.create({
  baseURL: 'https://6a631d671bffb2ffab8bbbbe.mockapi.io',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

travelApi.interceptors.request.use(attachToken, rejectError);
