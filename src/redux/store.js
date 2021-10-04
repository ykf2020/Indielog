import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/userReducer"
import songReducer, { setSongs, setCurrentSong } from "./reducers/songReducer"
import playerControlReducer from "./reducers/playerControlReducer"

export const store = configureStore({
  reducer: {
    user: userReducer,
    song: songReducer,
    playerControl: playerControlReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [setSongs, setCurrentSong]
      },
    }),
});
