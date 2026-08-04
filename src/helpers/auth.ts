interface AxiosErrorLike {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const getAuthErrorMessage = (error: unknown): string => {
  if (!error) return 'An unknown error occurred.';

  if (typeof error === 'object') {
    const axiosError = error as AxiosErrorLike;

    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }

    if (axiosError.message) {
      return axiosError.message;
    }
  }

  return typeof error === 'string'
    ? error
    : 'Authentication failed. Please try again.';
};
