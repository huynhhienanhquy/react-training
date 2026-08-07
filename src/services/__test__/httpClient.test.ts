import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createHttpClient } from '@/services/httpClient';

const requestUse = vi.fn();
const responseUse = vi.fn();
const client = {
  interceptors: {
    request: { use: requestUse },
    response: { use: responseUse },
  },
};

vi.mock('axios', () => ({
  default: { create: vi.fn(() => client) },
}));

describe('createHttpClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('creates a JSON client with the expected defaults', () => {
    expect(createHttpClient('https://example.test')).toBe(client);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://example.test',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('attaches the stored access token to requests', () => {
    localStorage.setItem('accessToken', 'secret-token');
    createHttpClient('https://example.test');
    const onRequest = requestUse.mock.calls[0][0];
    const config = { headers: {} } as InternalAxiosRequestConfig;

    expect(onRequest(config)).toBe(config);
    expect(config.headers.Authorization).toBe('Bearer secret-token');
  });

  it('leaves requests unchanged when no token exists', () => {
    createHttpClient('https://example.test');
    const onRequest = requestUse.mock.calls[0][0];
    const config = { headers: {} } as InternalAxiosRequestConfig;

    expect(onRequest(config).headers.Authorization).toBeUndefined();
  });

  it('rejects API error envelopes and passes successful responses through', async () => {
    createHttpClient('https://example.test');
    const onResponse = responseUse.mock.calls[0][0];
    const success = { data: { status: 'ok' } };

    expect(onResponse(success)).toBe(success);
    await expect(onResponse({ data: { status: 'error', message: 'Denied' } })).rejects.toThrow('Denied');
    await expect(onResponse({ data: { status: 'error' } })).rejects.toThrow('Operation failed');
  });

  it('propagates request and response interceptor errors', async () => {
    createHttpClient('https://example.test');
    const error = new Error('Network failure') as AxiosError;

    await expect(requestUse.mock.calls[0][1](error)).rejects.toBe(error);
    await expect(responseUse.mock.calls[0][1](error)).rejects.toBe(error);
  });
});
