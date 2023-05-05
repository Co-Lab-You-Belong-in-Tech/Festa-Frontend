import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  getDefaultMiddleware,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const initializeStore = (preloadedState) => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: [...getDefaultMiddleware({ serializableCheck: false })],
  });

  return store;
};

export function useStore(initialState) {
  const store = initializeStore(initialState);
  const persistor = persistStore(store);
  return { store, persistor };
}
