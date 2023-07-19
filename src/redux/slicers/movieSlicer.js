/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import throttle from 'lodash.throttle';

import { baseUrl } from 'helpers/utils';

export const fetchMoviesList = createAsyncThunk(
  'movies/fetchMoviesList',
  throttle(
    async (searchtexts) => {
      const response = await axios.get(`${baseUrl}${searchtexts}`);
      return response?.data;
    },
    300,
    { trailing: false },
  ),
);

export const fetchMovieInfo = createAsyncThunk(
  'movies/fetchMovieInfo',
  async (imdbID) => {
    const response = await axios.get(`${baseUrl}&i=${imdbID}`);
    return response.data;
  },
);

export const movieSlicer = createSlice({
  name: 'movies',
  initialState: {
    isLoading: false,
    moviesList: [],
    totalResults: 0,
    currentSelectedMovie: {},
    error: '',
    infiniteScroll: false,
  },
  reducers: {
    resetMoviesList: (state) => {
      state.moviesList = [];
      state.totalResults = 0;
      state.currentSelectedMovie = {};
    },
    setPageView: (state, action) => {
      state.infiniteScroll = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMoviesList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMoviesList.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.Response === 'True') {
          state.error = '';
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
      .addCase(fetchMoviesList.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(`Oops! ${action.error.message}`);
        state.error = action.error.message;
      })
      .addCase(fetchMovieInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovieInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSelectedMovie = action.payload;
      })
      .addCase(fetchMovieInfo.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(`Oops! ${action.error.message}`);
        state.error = action.error.message;
      });
  },
});

export const {
  getMoviesList, resetMoviesList, getMovieInfo, setPageView,
} = movieSlicer.actions;

export default movieSlicer.reducer;
