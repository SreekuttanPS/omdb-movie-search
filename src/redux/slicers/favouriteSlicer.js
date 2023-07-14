/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const favouriteSlicer = createSlice({
  name: 'favourites',
  initialState: {
    favList: [],
  },
  reducers: {
    addToFav: (state, action) => {
      state.favList.push({ ...action.payload, isTrash: false });
    },
    removeFromFav: (state, action) => {
      let index;
      state.favList.forEach((movie) => {
        if (movie.imdbID === action.payload) {
          index = state.favList.findIndex(
            (item) => item.imdbID === action.payload,
          );
          state.lastRemovedItem = [
            {
              movie,
              index,
            },
          ];
        }
      });
      state.favList.splice(index, 1);
    },
    moveToTrash: (state, action) => {
      state.favList.forEach((movie) => {
        if (movie.imdbID === action.payload) {
          const index = state.favList.findIndex(
            (item) => item.imdbID === action.payload,
          );
          state.favList[index].isTrash = true;
        }
      });
    },
  },
});

export const { addToFav, removeFromFav, moveToTrash } = favouriteSlicer.actions;

export default favouriteSlicer.reducer;
