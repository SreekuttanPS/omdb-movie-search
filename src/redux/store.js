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
    reduxState: persistReducer(persistConfig, rootReducer),
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
