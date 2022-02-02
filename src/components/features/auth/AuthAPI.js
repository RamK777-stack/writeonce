import {axiosInstance} from "../../../utils/axiosInstance"

export const sendLoginLink = async params => {
  return axiosInstance
    .post("auth/send-login-link", params)
    .then(res => res.data)
}

export const validateToken = async params => {
  return axiosInstance.get("auth/login-link", {params}).then(res => res.data)
}

export const getUserDetailsAPI = async () => {
  return axiosInstance.get("auth/details").then(res => res.data)
}

export const signinWithGoogle = async query => {
  return axiosInstance
    .get(`auth/google/callback/?${query}`)
    .then(res => res.data)
}
