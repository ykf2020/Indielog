import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state, action) => {
      state.user = null
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userReducer.actions;

export default userReducer.reducer;
