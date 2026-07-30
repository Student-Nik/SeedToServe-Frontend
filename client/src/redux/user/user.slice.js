import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIN: false,
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIN = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    removeUser: (state) => {
      state.isLoggedIN = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;