import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://sermon-notes-ltnt.onrender.com/api',
});
api.interceptors.request.use((config) => {
  // 1. read the saved user from localStorage and turn it back into an object
  const user = JSON.parse(localStorage.getItem('user'));
  // 2. if there is a user with a token, set config.headers.Authorization
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  } 
  
  return config;
});
export default api;
