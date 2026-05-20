import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      await api.post('/auth/logout/', { refresh: refreshToken });
    } catch (e) {
      // ignore errors on logout
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile/');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.patch('/auth/profile/', data);
    return response.data;
  },

  changePassword: async (data) => {
    const response = await api.post('/auth/change-password/', data);
    return response.data;
  },

  refreshToken: async (refresh) => {
    const response = await api.post('/auth/token/refresh/', { refresh });
    return response.data;
  },
};
