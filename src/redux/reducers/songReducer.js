import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  currentSong: {},
};

export const songReducer = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSongs, setCurrentSong } = songReducer.actions;

export default songReducer.reducer;
