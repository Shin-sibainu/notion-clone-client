import axiosClient from "./axiosClient";

const memoApi = {
  create: () => axiosClient.post("memo"),
  getAll: () => axiosClient.get("memo"),
  updatePosition: (params) => axiosClient.put("memo", params),
  getOne: (id) => axiosClient.get(`memo/${id}`),
  update: (id, params) => axiosClient.put(`memo/${id}`, params),
  getFavorites: () => axiosClient.get("memo/favorites"),
  delete: (id) => axiosClient.delete(`memo/${id}`),
};

export default memoApi;
