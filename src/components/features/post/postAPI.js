import {axiosInstance} from "../../../utils/axiosInstance"

export const fetchPosts = async params => {
  return axiosInstance.get("posts", {params}).then(res => res.data)
}

export const fetchDrafts = async params => {
  return axiosInstance.get("drafts", {params}).then(res => res.data)
}

export const fetchDraftById = async params => {
  return axiosInstance.get("drafts", params).then(res => res.data)
}

export const savePostAPI = async params => {
  return axiosInstance.post("posts", params).then(res => res.data)
}

export const addReactionToPostAPI = async params => {
  return axiosInstance.post("posts/add-reaction", params).then(res => res.data)
}

export const saveDraftAPI = async params => {
  return axiosInstance.post("drafts", params).then(res => res.data)
}

export const updateDraftAPI = async params => {
  return axiosInstance
    .put(`drafts/${params.draftId}`, params)
    .then(res => res.data)
}

export const deleteAPI = async params => {
  return axiosInstance.delete(`drafts/${params.id}`).then(res => res.data)
}

export const getBookMarkAPI = async params => {
  return axiosInstance.get("bookmarks", {params}).then(res => res.data)
}

export const createBookMarkAPI = async params => {
  return axiosInstance.post("bookmarks", params).then(res => res.data)
}

export const deleteBookMarkAPI = async bookMarkId => {
  return axiosInstance.delete(`bookmarks/${bookMarkId}`).then(res => res.data)
}

export const postDetailAPI = async params => {
  return axiosInstance.get(`posts/${params}`).then(res => res.data).catch(err => err)
}

export const getHashtagAPI = async () => {
  return axiosInstance.get("hashtags").then(res => res.data)
}

export const saveHashtagAPI = async params => {
  return axiosInstance.post("hashtags", params).then(res => res.data)
}

export const getUnsplashImagesAPI = async params => {
  return axiosInstance
    .post("posts/searchunsplashimages", params)
    .then(res => res.data)
}

export const uploadImageAPI = async params => {
  return axiosInstance.post("posts/uploadImages", params).then(res => res.data)
}
