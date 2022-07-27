import authApi from "../api/authApi";

const authUtils = {
  //トークンチェック
  isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (!token) return false;
    try {
      //ここが上手く呼べてない
      const res = await authApi.verifyToken();
      return res.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
