import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import songReducer from "./reducers/songReducer";
import playerControlReducer from "./reducers/playerControlReducer";
import pageTitleReducer from "./reducers/pageTitleReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    song: songReducer,
    playerControl: playerControlReducer,
    pageTitle: pageTitleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
