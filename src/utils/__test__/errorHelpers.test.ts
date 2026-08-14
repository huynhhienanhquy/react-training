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

  it('falls back through Axios, Error, and string messages', () => {
    expect(getErrorMessage(new AxiosError('Network down'))).toBe('Network down');
    expect(getErrorMessage(new AxiosError(''), 'Custom fallback')).toBe('Custom fallback');
    expect(getErrorMessage(new Error('Broken'))).toBe('Broken');
    expect(getErrorMessage(new Error(''), 'Custom fallback')).toBe('Custom fallback');
    expect(getErrorMessage('Plain failure')).toBe('Plain failure');
    expect(getErrorMessage('', 'Custom fallback')).toBe('Custom fallback');
  });
});
