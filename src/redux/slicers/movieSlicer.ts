import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

import { baseUrl } from "helpers/utils";
import { MovieInfoType, MovieType } from "helpers/sharedTypes";

type MoviesInitialState = {
  isLoading: boolean;
  moviesList: MovieType[];
  totalResults: number;
  currentSelectedMovie: MovieInfoType;
  error: string;
  infiniteScroll: boolean;
  isLoggedIn: boolean;
  userId: string;
};

const initialState: MoviesInitialState = {
  isLoading: false,
  moviesList: [],
  totalResults: 0,
  currentSelectedMovie: {} as MovieInfoType,
  error: "",
  infiniteScroll: false,
  isLoggedIn: false,
  userId: "",
};

export const fetchMoviesList = createAsyncThunk("movies/fetchMoviesList", async (searchtexts) => {
  const response = await axios.get(`${baseUrl}${searchtexts}`);
  return response?.data;
});

export const fetchMovieInfo = createAsyncThunk("movies/fetchMovieInfo", async (imdbID: string) => {
  const response = await axios.get(`${baseUrl}&i=${imdbID}`);
  return response.data;
});

export const movieSlicer = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    resetMoviesList: (state: MoviesInitialState) => {
      state.moviesList = [];
      state.totalResults = 0;
      state.currentSelectedMovie = {} as MovieInfoType;
    },
    setPageView: (state: MoviesInitialState, action:PayloadAction<boolean>) => {
      state.infiniteScroll = action.payload;
    },
    setLoginInfo: (
      state: MoviesInitialState,
      action: PayloadAction<{ isLoggedIn: boolean; userId: string }>
    ) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userId = action.payload.userId;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMoviesList.pending, (state: MoviesInitialState) => {
        state.isLoading = true;
      })
      .addCase(fetchMoviesList.fulfilled, (state: MoviesInitialState, action) => {
        state.isLoading = false;
        if (action.payload.Response === "True") {
          state.error = "";
          state.totalResults = action.payload.totalResults;
          if (state.infiniteScroll) {
            state.moviesList = state.moviesList.concat(action.payload.Search);
          } else {
            state.moviesList = action.payload.Search;
          }
        } else {
          state.error = action.payload.Error;
        }
      })
      .addCase(fetchMoviesList.rejected, (state: MoviesInitialState, action) => {
        state.isLoading = false;
        toast.error(`Oops! ${action.error.message}`);
        state.error = action.error.message as string;
      })
      .addCase(fetchMovieInfo.pending, (state: MoviesInitialState) => {
        state.isLoading = true;
      })
      .addCase(fetchMovieInfo.fulfilled, (state: MoviesInitialState, action) => {
        state.isLoading = false;
        state.currentSelectedMovie = action.payload;
      })
      .addCase(fetchMovieInfo.rejected, (state: MoviesInitialState, action) => {
        state.isLoading = false;
        toast.error(`Oops! ${action.error.message}`);
        state.error = action.error.message as string;
      });
  },
});

export const { resetMoviesList, setPageView, setLoginInfo } = movieSlicer.actions;

export default movieSlicer.reducer;
