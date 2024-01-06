import axios from "axios";

const instance = axios.create({
  baseURL: "/",
});

// 對 axios 進行一層封裝
instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
