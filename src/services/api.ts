import { API_URLS } from '../constants/api';
import { createHttpClient } from './httpClient';

export const flightApi = createHttpClient(API_URLS.FLIGHT);

export const authApi = createHttpClient(API_URLS.AUTH);

export const travelApi = createHttpClient(API_URLS.TRAVEL);
