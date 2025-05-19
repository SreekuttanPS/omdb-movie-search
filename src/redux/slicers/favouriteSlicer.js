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
      action.payload.forEach((imdbID) => {
        state.favList.forEach((movie) => {
          if (movie.imdbID === imdbID) {
            const index = state.favList.findIndex(
              (item) => item.imdbID === imdbID,
            );
            state.favList[index].isTrash = true;
          }
        });
      });
    },
    removeFromTrash: (state, action) => {
      let index = 0;
      action.payload.forEach((imdbID) => {
        state.favList.forEach((movie) => {
          if (movie.imdbID === imdbID) {
            index = state.favList.findIndex(
              (item) => item.imdbID === imdbID,
            );
            if (index) {
              state.favList.splice(index, 1);
            }
          }
        });
      });
    },
  },
});

export const {
  addToFav, removeFromFav, moveToTrash, removeFromTrash,
} = favouriteSlicer.actions;

export default favouriteSlicer.reducer;
