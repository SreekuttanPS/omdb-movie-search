import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavMovieType } from "helpers/sharedTypes";

interface LastRemovedItem {
  movie: FavMovieType;
  index: number;
}

interface FavouriteState {
  favList: FavMovieType[];
  lastRemovedItem?: LastRemovedItem[];
}

const initialState: FavouriteState = {
  favList: [],
};

const favouriteSlicer = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFav: (state, action: PayloadAction<FavMovieType>) => {
      state.favList.push({ ...action.payload, isTrash: false });
    },
    removeFromFav: (state, action: PayloadAction<string>) => {
      const index = state.favList.findIndex((item) => item.imdbID === action.payload);
      if (index !== -1) {
        state.lastRemovedItem = [
          {
            movie: state.favList[index],
            index,
          },
        ];
        state.favList.splice(index, 1);
      }
    },
    moveToTrash: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((imdbID) => {
        const index = state.favList.findIndex((item) => item.imdbID === imdbID);
        if (index !== -1) {
          state.favList[index].isTrash = true;
        }
      });
    },
    removeFromTrash: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((imdbID) => {
        const index = state.favList.findIndex((item) => item.imdbID === imdbID);
        if (index !== -1) {
          state.favList.splice(index, 1);
        }
      });
    },
  },
});

export const { addToFav, removeFromFav, moveToTrash, removeFromTrash } = favouriteSlicer.actions;

export default favouriteSlicer.reducer;
