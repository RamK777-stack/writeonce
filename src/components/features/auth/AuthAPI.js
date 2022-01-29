import { axiosInstance } from "../../../utils/axiosInstance";

export const sendLoginLink = (params) => {
  return axiosInstance
    .post("auth/send-login-link", params)
    .then((res) => res.data);
};

export const validateToken = (params) => {
  return axiosInstance
    .get("auth/login-link", { params })
    .then((res) => res.data);
};

export const getUserDetailsAPI = () => {
  return axiosInstance.get("auth/details").then((res) => res.data);
};
