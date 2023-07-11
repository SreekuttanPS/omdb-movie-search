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
    favMovieList: [],
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
    getMovieInfo: (state) => {
      state.value += 1;
    },
    addMovieToFav: (state, action) => {
      state.moviesList = state.moviesList.map((movie) => {
        if (movie.imdbID === action.payload) {
          toast.success(
            movie.isFavourite
              ? 'Removed from favourites!'
              : 'Added to favourites!',
          );

          if (!movie.isFavourite) {
            state.favMovieList.push(movie);
          } else {
            const index = state.favMovieList.findIndex(
              (item) => item.imdbID === action.payload,
            );
            state.favMovieList.splice(index, 1);
          }

          return Object.assign(movie, {
            isFavourite: !movie.isFavourite,
          });
        }
        return movie;
      });
    },
    removeFromFav: (state, action) => {
      let index;
      state.favMovieList.forEach((movie) => {
        if (movie.imdbID === action.payload) {
          index = state.favMovieList.findIndex(
            (item) => item.imdbID === action.payload,
          );
          toast.success('Removed from favourites!');
        }
      });
      state.favMovieList.splice(index, 1);
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
          state.moviesList = action.payload.Search.map((item) => {
            const isAddedToFav = state.favMovieList.find(
              (favMovie) => favMovie.imdbID === item.imdbID,
            );
            if (isAddedToFav) {
              Object.assign(item, {
                isFavourite: true,
              });
            } else {
              Object.assign(item, {
                isFavourite: false,
              });
            }
            return item;
          });
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
  getMoviesList,
  resetMoviesList,
  getMovieInfo,
  addMovieToFav,
  removeFromFav,
} = movieSlicer.actions;

export default movieSlicer.reducer;
