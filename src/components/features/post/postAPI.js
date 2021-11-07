import { axiosInstance } from "../../../utils/axiosInstance";

export const fetchPosts = async () => {
  return axiosInstance
    .get("posts")
    .then((res) => res.data);
};

export const fetchDrafts = async () => {
  return axiosInstance
    .get("drafts")
    .then((res) => res.data);
};



export const savePostAPI = async () => {
  const params = {
    title: "Create post from application",
    description: "Testing..",
  };
  return axiosInstance
    .post("posts", params)
    .then((res) => res.data);
};

export const saveDraftAPI = async (params) => {
  return axiosInstance
    .post("drafts", params)
    .then((res) => res.data);
};
