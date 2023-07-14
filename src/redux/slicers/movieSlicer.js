/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { baseUrl } from 'helpers/utils';

export const fetchMoviesList = createAsyncThunk(
  'movies/fetchMoviesList',
  async (searchtexts) => {
    const response = await axios.get(`${baseUrl}${searchtexts}`);
    return response?.data;
  },
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
  },
  reducers: {
    resetMoviesList: (state) => {
      state.moviesList = [];
      state.totalResults = 0;
      state.currentSelectedMovie = {};
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
          state.moviesList = action.payload.Search;
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

export const { getMoviesList, resetMoviesList, getMovieInfo } = movieSlicer.actions;

export default movieSlicer.reducer;
