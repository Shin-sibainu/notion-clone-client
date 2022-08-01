import axios from "axios";
import queryString from "query-string"; //URLクエリを取得するため

const BASE_URL = "http://localhost:5000/api/v1";
const getToken = () => localStorage.getItem("token");

//axiosのインスタンス化((前処理の共通化のため=全部JSON化しておく))
const axiosClient = axios.create({
  baseURL: BASE_URL,
  //パラメータをJson化する。
  paramsSerializer: (params) => queryString.stringify({ params }),
});

//APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`, //リクエストヘッダにトークンを付けてサーバーに渡す
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosClient;
