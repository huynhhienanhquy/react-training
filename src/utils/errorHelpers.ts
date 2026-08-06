import { AxiosError } from 'axios';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';

interface ErrorResponse {
  message?: string;
}

export const getErrorMessage = (
  error: unknown,
  fallback = DEFAULT_ERROR_MESSAGE,
): string => {
  if (error instanceof AxiosError) {
    const responseMessage = (error.response?.data as ErrorResponse | undefined)
      ?.message;

    return responseMessage || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  if (typeof error === 'string' && error) {
    return error;
  }

  return fallback;
};
