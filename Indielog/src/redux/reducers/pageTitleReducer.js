import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTitle: "Indielog",
};

export const pageTitleReducer = createSlice({
  name: "pageTitle",
  initialState,
  reducers: {
    setCurrentTitle: (state, action) => {
      state.currentTitle = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentTitle } = pageTitleReducer.actions;

export default pageTitleReducer.reducer;
