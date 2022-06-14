import axios from "axios"
import SecureLS from "secure-ls"

console.log(process.env.NEXT_PUBLIC_BASE_URL)

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

axiosInstance.interceptors.request.use(config => {
  if (typeof window !== "undefined") {
    const ls = new SecureLS()
    const session = ls.get("userSession")
    if (session?.jwt) {
      config.headers["Authorization"] = `Bearer ${session?.jwt}`
    }
    return config
  }
  return config
})

// axiosInstance.interceptors.response.use((response) => {
//     return response;
// }, (error) => {
//     if(error?.response?.status === 401){

//     }
//     return Promise.reject(error);
// })
