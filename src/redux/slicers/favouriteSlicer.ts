import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "helpers/sharedTypes";

interface FavouriteState {
  favourites: {
    [imdbId: string]: MovieType & { isTrash: boolean };
  };
}

const initialState: FavouriteState = {
  favourites: {},
};

const favouriteSlicer = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFav: (state, action: PayloadAction<MovieType>) => {
      if (!state.favourites?.[action.payload.imdbID]) {
        state.favourites = {
          ...state.favourites,
          [action.payload.imdbID]: {
          ...action.payload,
          isTrash: false,
          }
        };
      }
    },
    removeFromFav: (state, action: PayloadAction<MovieType>) => {
      if (state?.favourites?.[action?.payload?.imdbID]) {
        delete state.favourites[action.payload.imdbID];
      }
    },
    moveToTrash: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((imdbID) => {
        if (state.favourites[imdbID]) {
          state.favourites[imdbID].isTrash = true;
        }
      });
    },
    restoreFromTrash: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((imdbID) => {
        if (state.favourites[imdbID]) {
          state.favourites[imdbID].isTrash = false;
        }
      });
    },
    removePermanently: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((imdbID) => {
        delete state.favourites[imdbID];
      });
    },
  },
});

export const { addToFav, removeFromFav, moveToTrash, restoreFromTrash, removePermanently } =
  favouriteSlicer.actions;

export default favouriteSlicer.reducer;
