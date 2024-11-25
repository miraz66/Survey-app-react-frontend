// import axios from "axios";
// import router from "./router.jsx";
//
// const axiosClient = axios.create({
//   baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
// });
// export default axiosClient;
//
// axiosClient.interceptors.request.use((config) => {
//   const token = "123456";
//   // config.headers.Authorization = `Bearer ${import.meta.env.VITE_API_TOKEN}`;
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
//
// axiosClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       router.navigate("/login");
//       return error;
//     }
//     throw error;
//   },
// );

import axios from "axios";

// Create an instance of Axios
const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api", // Replace with your API base URL
});

// Add a request interceptor to include the token in headers
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor (optional for handling errors globally)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Optionally handle unauthorized errors (e.g., redirect to login)
      console.error("Unauthorized! Redirecting to login...");
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
