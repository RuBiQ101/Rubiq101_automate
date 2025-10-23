import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const rawApiUrl = (Constants.expoConfig?.extra as any)?.apiUrl || 'http://localhost:3001';
const apiUrl = `${String(rawApiUrl).replace(/\/$/, '')}/api`;

export const api = axios.create({
  baseURL: apiUrl,
  timeout: 15000,
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('auth_token');
    if (token) {
      config.headers = config.headers || {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    // Optional: On 401, clear token so app can redirect to login
    if (err?.response?.status === 401) {
      try { await SecureStore.deleteItemAsync('auth_token'); } catch {}
    }
    return Promise.reject(err);
  }
);
