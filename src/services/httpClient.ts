import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';

const attachToken = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const rejectError = (error: AxiosError) => Promise.reject(error);

export const createHttpClient = (baseURL: string) => {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(attachToken, rejectError);

  client.interceptors.response.use(
    (response) => {
      if (response.data?.status === 'error') {
        return Promise.reject(
          new Error(response.data.message || 'Operation failed')
        );
      }

      return response;
    },
    rejectError
  );

  return client;
};
