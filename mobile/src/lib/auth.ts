import * as SecureStore from 'expo-secure-store';
import { api } from './api';

const TOKEN_KEY = 'auth_token';

export async function getToken(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function setToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function clearToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export async function login(email: string, password: string): Promise<boolean> {
  try {
    const res = await api.post('/auth/login', { email, password });
    const token = res.data?.token;
    if (token) {
      await setToken(token);
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export async function logout() {
  await clearToken();
}
