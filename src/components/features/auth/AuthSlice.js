import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {
  sendLoginLink,
  validateToken,
  getUserDetailsAPI,
  signinWithGoogle,
} from "./AuthAPI"
import SecureLS from "secure-ls"
const ls = new SecureLS()

const initialState = {
  loggedIn: false,
  isModalOpen: false,
  userDetails: {},
  isSideBarOpen: false,
}

export const loginUsingLink = createAsyncThunk(
  "auth/login/link",
  async email => {
    try {
      const response = await sendLoginLink({
        email: email,
        redirectURI: `${window.location.origin}/auth/callback`,
      })
      // The value we return becomes the `fulfilled` action payload
      return response
    } catch (e) {
      throw new Error(e.response?.data?.message)
    }
  },
)

export const login = createAsyncThunk("auth/login", async token => {
  try {
    const response = await validateToken({loginToken: token})
    ls.set("userSession", response)
    return response
  } catch (e) {
    console.log(e)
    throw e
  }
})

export const googleSignin = createAsyncThunk(
  "auth/googleSignin",
  async query => {
    try {
      const response = await signinWithGoogle(query)
      ls.set("userSession", response)
      return response
    } catch (e) {
      console.log(e)
      throw e
    }
  },
)

export const getUserDetail = createAsyncThunk(
  "auth/getUserDetail",
  async () => {
    try {
      const response = await getUserDetailsAPI()
      return response
    } catch (e) {
      console.log(e)
      throw e
    }
  },
)

export const logOut = () => {
  ls.clear()
}

export const isLoggedIn = () => {
  return ls.get("userSession")
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openModal: state => {
      state.isModalOpen = true
    },
    closeModal: state => {
      state.isModalOpen = false
    },
    toggleSideBarOpen: state => {
      state.isSideBarOpen = !state.isSideBarOpen
    },
  },
  extraReducers: {
    [getUserDetail.fulfilled]: (state, action) => {
      state.userDetails = action.payload
    },
    [getUserDetail.rejected]: (state, action) => {
      state.userDetails = action.payload
    },
  },
})

export const {openModal, closeModal, toggleSideBarOpen} = authSlice.actions
export const isModalOpen = state => state.auth.isModalOpen
export const isSideBarOpen = state => state.auth.isSideBarOpen

export default authSlice.reducer
