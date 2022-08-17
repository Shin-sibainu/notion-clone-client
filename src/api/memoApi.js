import axiosClient from "./axiosClient";

const memoApi = {
  create: () => axiosClient.post("memo"),
  getAll: () => axiosClient.get("memo"),
  updatePosition: (params) => axiosClient.put("memo", params),
  getOne: (id) => axiosClient.get(`memo/${id}`),
};

export default memoApi;
