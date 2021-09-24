import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingPost: false,
  post: {},

  newPostResponse: null,
  editPostResponse: null,
};

export const postReducer = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoadingPost, setPost, setNewPostResponse } =
  postReducer.actions;


export default postReducer.reducer;
