import api from './api';

export const applicationService = {
  getAll: async (params = {}) => {
    const response = await api.get('/applications/', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/applications/${id}/`);
    return response.data;
  },

  create: async (data) => {
    const config = {};
    if (data instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    const response = await api.post('/applications/', data, config);
    return response.data;
  },

  update: async (id, data) => {
    const config = {};
    if (data instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    const response = await api.patch(`/applications/${id}/`, data, config);
    return response.data;
  },

  replace: async (id, data) => {
    const config = {};
    if (data instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    const response = await api.put(`/applications/${id}/`, data, config);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/applications/${id}/`);
  },
};
