import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/userReducer"
import songReducer from "./reducers/songReducer"
import playerControlReducer from "./reducers/playerControlReducer"

export const store = configureStore({
  reducer: {
    user: userReducer,
    song: songReducer,
    playerControl: playerControlReducer,
  },
});
