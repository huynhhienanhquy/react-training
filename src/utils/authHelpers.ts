interface AxiosErrorLike {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const getAuthErrorMessage = (error: unknown): string => {
  if (!error) return "An unknown error occurred.";

  // Check if the error is an object containing the desired properties.
  if (typeof error === 'object') {
    const err = error as AxiosErrorLike;

    // If the error returned from axios or fetch contains a message from the server.
    if (err.response?.data?.message) {
      return err.response.data.message;
    }

    if (err.message) {
      return err.message;
    }
  }

  return typeof error === 'string' ? error : "Authentication failed. Please try again.";
};
