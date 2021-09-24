import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  libraryStatus: false,
  sound: {
    mute: false,
    volume:0.5,
    prevVolume:0.5,
  },
  songPlayingInfo: {
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  },
};

export const playerControlReducer = createSlice({
  name: "playerControl",
  initialState,
  reducers: {
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setLibraryStatus: (state, action) => {
      state.libraryStatus = action.payload
    },
    setSongPlayingInfo: (state, action) => {
      state.songPlayingInfo = action.payload;
    },
    setSound: (state, action) => {
      state.sound = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSound, setIsPlaying, setLibraryStatus, setSongPlayingInfo } = playerControlReducer.actions;

export default playerControlReducer.reducer;
