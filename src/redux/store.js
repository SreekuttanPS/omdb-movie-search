import { configureStore } from '@reduxjs/toolkit';

import movieReducer from './slicers/movieSlicer';

export default configureStore({
  reducer: {
    movies: movieReducer,
  },
});
