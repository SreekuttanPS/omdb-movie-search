import { configureStore } from '@reduxjs/toolkit';
import undoable from 'redux-undo';

import movieReducer from './slicers/movieSlicer';
import favouriteReducer from './slicers/favouriteSlicer';

export default configureStore({
  reducer: {
    movies: movieReducer,
    favourites: undoable(favouriteReducer),
  },
});
