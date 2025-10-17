import axios from 'axios';
import Constants from 'expo-constants';

const apiUrl = (Constants.expoConfig?.extra as any)?.apiUrl || 'http://localhost:4000';

export const api = axios.create({
  baseURL: apiUrl,
  timeout: 15000,
});
