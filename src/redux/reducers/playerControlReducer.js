import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  loop:false,
  mode: 1, // 0: turnoff; 1: small player; 2: full player without library; 3: fullPlayer with library
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
    setMode: (state, action) => {
      state.mode = action.payload
    },
    setSongPlayingInfo: (state, action) => {
      state.songPlayingInfo = action.payload;
    },
    setSound: (state, action) => {
      state.sound = action.payload;
    },
    setLoop:(state, action) => {
      state.loop = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setSound, setIsPlaying, setMode, setSongPlayingInfo, setLoop } = playerControlReducer.actions;

export default playerControlReducer.reducer;
