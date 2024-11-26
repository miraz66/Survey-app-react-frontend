import axios from "axios";

// Create an instance of Axios
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
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
