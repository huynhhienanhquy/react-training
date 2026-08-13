import { AxiosError, AxiosHeaders } from 'axios';
import { describe, expect, it } from 'vitest';
import { getErrorMessage } from '@/utils/errorHelpers';

describe('getErrorMessage', () => {
  it('prioritizes the API response message for Axios errors', () => {
    const error = new AxiosError(
      'Request failed',
      undefined,
      undefined,
      undefined,
      {
        data: { message: 'Session expired' },
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        config: { headers: new AxiosHeaders() },
      },
    );

    expect(getErrorMessage(error)).toBe('Session expired');
  });

  it('uses the same fallback for unsupported error values', () => {
    expect(getErrorMessage(null)).toBe(
      'Something went wrong. Please try again.',
    );
  });

  it('uses a regular Error message', () => {
    expect(getErrorMessage(new Error('Offline'))).toBe('Offline');
  });

  it('uses the Axios message when the response has no API message', () => {
    expect(getErrorMessage(new AxiosError('Request timed out'))).toBe('Request timed out');
  });

  it('uses the fallback for errors with empty messages', () => {
    expect(getErrorMessage(new Error(''))).toBe('Something went wrong. Please try again.');
  });

  it('returns a string error unchanged', () => {
    expect(getErrorMessage('Connection lost')).toBe('Connection lost');
  });

  it('supports a custom fallback for empty Axios errors', () => {
    expect(getErrorMessage(new AxiosError(''), 'Try later')).toBe('Try later');
  });
});
