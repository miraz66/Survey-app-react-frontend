import axios from "axios";
import router from "./router.jsx";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});
export default axiosClient;

axiosClient.interceptors.request.use((config) => {
  const token = "123456";
  // config.headers.Authorization = `Bearer ${import.meta.env.VITE_API_TOKEN}`;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      router.navigate("/login");
      return error;
    }
    throw error;
  },
);
// export const setToken = (token) => {
//   api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };
//
// export const removeToken = () => {
//   delete api.defaults.headers.common["Authorization"];
// };
//
// export const handleResponse = (response) => {
//   if (response.status === 401) {
//     removeToken();
//   }
//   return response;
// };
//
// api.interceptors.response.use(handleResponse);
//
// export const handleError = (error) => {
//   if (error.response.status === 401) {
//     removeToken();
//   }
//   return Promise.reject(error);
// };
//
// api.interceptors.response.use(null, handleError);
//
// export const handleRequest = (request) => {
//   if (request.headers.Authorization) {
//     request.headers.Authorization = `Bearer ${token}`;
//   }
//   return request;
// };
//
// api.interceptors.request.use(handleRequest);
//
// export const handleErrorRequest = (error) => {
//   if (error.response.status === 401) {
//     removeToken();
//   }
//   return Promise.reject(error);
// };
//
// api.interceptors.request.use(null, handleErrorRequest);