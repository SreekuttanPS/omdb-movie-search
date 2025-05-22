import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import undoable from 'redux-undo';
import storage from 'redux-persist/lib/storage';

import movieReducer from './slicers/movieSlicer';
import favouriteReducer from './slicers/favouriteSlicer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  movies: movieReducer,
  favourites: undoable(favouriteReducer),
});

export const store = configureStore({
  reducer: {
    persistedState: persistReducer<RootReducerState>(persistConfig, rootReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootReducerState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
