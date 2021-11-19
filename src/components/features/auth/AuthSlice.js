import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  isModalOpen: false,
};

export const login = createAsyncThunk("auth/login", async (params) => {
  // api call
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
  extraReducers: {},
});

export const { openModal, closeModal } = authSlice.actions;
export const isModalOpen = (state) => state.auth.isModalOpen;

export default authSlice.reducer;
