import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {
  fetchPosts,
  savePostAPI,
  saveDraftAPI,
  fetchDrafts,
  fetchDraftById,
  updateDraftAPI,
  deleteAPI,
  getBookMarkAPI,
  createBookMarkAPI,
  deleteBookMarkAPI,
  postDetailAPI,
  getHashtagAPI,
  saveHashtagAPI,
  addReactionToPostAPI,
  getUnsplashImagesAPI,
  uploadImageAPI,
} from "./postAPI"
import {isLoggedIn, openModal} from "../auth/AuthSlice"

const initialState = {
  posts: [],
  isLoading: false,
  isSaving: false,
  drafts: [],
  bookmarks: [],
  postDetail: {},
  hashtags: [],
  unsplashImages: [],
  isImageUploading: false,
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getPosts = createAsyncThunk("post/getPosts", async params => {
  const response = await fetchPosts(params)
  // The value we return becomes the `fulfilled` action payload
  return response
})

export const getDrafts = createAsyncThunk(
  "post/getDrafts",
  async (params, getState) => {
    const response = await fetchDrafts(params)
    // The value we return becomes the `fulfilled` action payload
    return response
  },
)

export const getDraftDetails = createAsyncThunk(
  "post/getDraftDetail",
  async id => {
    const response = await fetchDraftById(id)
    return response
  },
)

export const savePost = createAsyncThunk(
  "post/savePost",
  async (inputParams, {getState}) => {
    const userDetails = getState().auth?.userDetails
    const {draftId, blocks, description, markdown, hashtags, coverImage} =
      inputParams
    const params = {
      title: blocks[0].description,
      description: description,
      markdown: markdown,
      draftId: draftId,
      author: userDetails?.id,
      hashtags,
      coverImage,
    }
    const response = await savePostAPI(params)
    return response
  },
)

export const addReactionToPost = createAsyncThunk(
  "post/addReactionToPost",
  async (inputParams, {getState}) => {
    const userDetails = getState().auth?.userDetails
    const params = {
      ...inputParams,
      reacted_by: userDetails?.id,
    }
    const response = await addReactionToPostAPI(params)
    return response
  },
)

export const getPostDetail = createAsyncThunk(
  "post/getPostDetail",
  async (params, thunkAPI) => {
    const response = await postDetailAPI(params)
    return response
  },
)

export const deleteDraft = createAsyncThunk(
  "post/deleteDraft",
  async (params, thunkAPI) => {
    if (!isLoggedIn()) {
      thunkAPI.dispatch(openModal())
      throw new Error("user not logged in")
    }
    const response = await deleteAPI(params)
    return response
  },
)

export const saveAsDraft = createAsyncThunk(
  "post/saveDrafts",
  async inputParams => {
    const {draftId, blocks} = inputParams
    const params = {
      title: blocks[0].description,
      draft_blocks: blocks,
    }
    if (draftId) {
      params["draftId"] = draftId
      const response = await updateDraftAPI(params)
      return response
    }
    const response = await saveDraftAPI(params)
    return response
  },
)

export const getBookMark = createAsyncThunk(
  "post/getBookMark",
  async (params, thunkAPI) => {
    thunkAPI.dispatch(startLoader())
    const response = await getBookMarkAPI(params)
    return response
  },
)

export const createBookMark = createAsyncThunk(
  "post/createBookMark",
  async postId => {
    const params = {
      post: postId,
    }
    const response = await createBookMarkAPI(params)
    return response
  },
)

export const deleteBookMark = createAsyncThunk(
  "post/deleteBookMark",
  async bookMarkId => {
    const response = await deleteBookMarkAPI(bookMarkId)
    return response
  },
)

export const getHashtag = createAsyncThunk("post/getHashtag", async params => {
  const response = await getHashtagAPI()
  return response
})

export const saveHashtag = createAsyncThunk(
  "post/saveHashtag",
  async (label, {getState}) => {
    const userDetails = getState().auth?.userDetails
    const params = {
      label: label,
      createdBy: userDetails?.id,
    }
    const response = await saveHashtagAPI(params)
    return response
  },
)

export const getUnsplashImages = createAsyncThunk(
  "post/getUnsplashImages",
  async (params, {getState}) => {
    const response = await getUnsplashImagesAPI(params)
    return response?.results || []
  },
)

export const uploadImage = createAsyncThunk(
  "post/uploadImages",
  async (params, thunkAPI) => {
    thunkAPI.dispatch(toggleImageUploadingStatus())
    const response = await uploadImageAPI(params)
    return response
  },
)

export const postSlice = createSlice({
  name: "post",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
    startLoader: state => {
      state.isLoading = true
    },

    toggleImageUploadingStatus: state => {
      state.isImageUploading = !state.isImageUploading
    },

    clearPost: state => {
      state.posts = []
      state.bookmarks = []
      state.drafts = []
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.isLoading = true
    },
    [getPosts.fulfilled]: (state, action) => {
      if (action?.meta?.arg?.isAppend) {
        state.posts = state.posts.concat(action.payload)
      } else {
        state.posts = action.payload
      }
      state.bookmarks = []
      state.isLoading = false
    },
    [getBookMark.fulfilled]: (state, action) => {
      if (action?.meta?.arg?.isAppend) {
        state.bookmarks = state.bookmarks.concat(action.payload)
      } else {
        state.bookmarks = action.payload
      }
      state.posts = []
      state.isLoading = false
    },
    [getBookMark.rejected]: (state, action) => {
      state.bookmarks = []
      state.isLoading = false
    },
    [getPosts.rejected]: (state, action) => {
      state.isLoading = false
    },
    [getDrafts.pending]: (state, action) => {
      state.isLoading = true
    },
    [getDrafts.fulfilled]: (state, action) => {
      if (action?.meta?.arg?.isAppend) {
        state.drafts = state.drafts.concat(action.payload)
      } else {
        state.drafts = action.payload
      }
      state.isLoading = false
    },
    [getDrafts.rejected]: (state, action) => {
      state.isLoading = false
    },
    [savePost.pending]: (state, action) => {
      state.isSaving = true
    },
    [savePost.fulfilled]: (state, action) => {
      state.isSaving = false
    },
    [savePost.rejected]: (state, action) => {
      state.isSaving = false
    },
    [getPostDetail.fulfilled]: (state, action) => {
      state.isSaving = false
      state.postDetail = action.payload
    },
    [deleteDraft.rejected]: (state, action) => {
      state.isLoading = false
    },
    [deleteDraft.fulfilled]: (state, action) => {
      const index = state.drafts.findIndex(
        item => item.id === action.payload.id,
      )
      state.drafts.splice(index, 1)
      state.isLoading = false
    },
    [createBookMark.fulfilled]: (state, action) => {
      const index = state.posts.findIndex(
        item => item.id === action.payload.post?.id,
      )
      if (state.posts[index]) {
        state.posts[index].isBookMarked = true
        state.posts[index].bookMarkId = action.payload?.id
      }
      state.isLoading = false
    },
    [deleteBookMark.fulfilled]: (state, action) => {
      //change bookmark state in post list
      const index = state.posts.findIndex(
        item => item.id === action.payload.post?.id,
      )
      if (state.posts[index]) {
        state.posts[index].isBookMarked = false
      }
      // splice bookmark from list
      const bookmarkIndex = state.bookmarks.findIndex(
        item => item.id === action.payload.id,
      )
      state.bookmarks.splice(bookmarkIndex, 1)
      state.isLoading = false
    },
    [getHashtag.fulfilled]: (state, action) => {
      state.hashtags = action.payload
    },
    [getHashtag.rejected]: (state, action) => {
      state.hashtags = []
    },
    [saveHashtag.fulfilled]: (state, action) => {
      state.hashtags.push(action.payload)
    },
    [getUnsplashImages.fulfilled]: (state, action) => {
      state.unsplashImages = action.payload
    },
    [uploadImage.fulfilled]: (state, action) => {
      state.isImageUploading = false
    },
  },
})

export const {startLoader, clearPost, toggleImageUploadingStatus} =
  postSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPosts = state => state.post.posts

export default postSlice.reducer
