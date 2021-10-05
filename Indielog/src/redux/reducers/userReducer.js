import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state, action) => {
      state.currentUser = null
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userReducer.actions;

export default userReducer.reducer;
