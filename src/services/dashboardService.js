import api from './api';

export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats/');
    return response.data;
  },

  getMonthly: async () => {
    const response = await api.get('/dashboard/monthly/');
    return response.data;
  },

  getPlatform: async () => {
    const response = await api.get('/dashboard/platform/');
    return response.data;
  },

  getStatus: async () => {
    const response = await api.get('/dashboard/status/');
    return response.data;
  },
};
