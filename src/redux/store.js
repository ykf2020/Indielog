import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./reducers/songReducer";
import playerControlReducer from "./reducers/playerControlReducer";

export const store = configureStore({
  reducer: {
    song: songReducer,
    playerControl: playerControlReducer,
  },
});
