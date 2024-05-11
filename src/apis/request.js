import axios from "axios";

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // 设置基础URL
  timeout: 5000, // 请求超时时间（毫秒）
  headers: {
    "Content-Type": "application/json", // 设置默认请求头
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 对响应错误做些什么
    console.log(error);
    return Promise.reject(error);
  },
);

// 封装请求方法
const request = {
  get: (url, params) => axiosInstance.get(url, { params }),
  post: (url, data) => axiosInstance.post(url, data),
  put: (url, data) => axiosInstance.put(url, data),
  delete: (url) => axiosInstance.delete(url),
};

export default request;
