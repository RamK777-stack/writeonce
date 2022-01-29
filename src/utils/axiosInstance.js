import axios from "axios";
import SecureLS from "secure-ls";
const ls = new SecureLS();

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const session = ls.get("userSession");
  const date = new Date();
  if (session?.jwt) {
    config.headers["Authorization"] = `Bearer ${session?.jwt}`;
  }
  return config;
});

// axiosInstance.interceptors.response.use((response) => {
//     return response;
// }, (error) => {
//     if(error?.response?.status === 401){

//     }
//     return Promise.reject(error);
// })
