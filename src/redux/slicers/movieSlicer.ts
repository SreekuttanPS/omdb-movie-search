import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

import { baseUrl } from "helpers/utils";
import { CategoryType, MovieInfoType } from "helpers/sharedTypes";

type SearchResponse = {
  Search: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: CategoryType;
    Poster: string;
  }[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
};

type MoviesInitialState = {
  isLoading: boolean;
  moviesList: SearchResponse["Search"];
  selectedMovie: MovieInfoType;
  currentPage: number;
  searchText: string;
  totalResults: number;
  errorText?: string;
  pageView: "paginate" | "infinite_sroll";
  login: {
    isLoggedIn: boolean;
    userName?: string;
  };
};

const initialState: MoviesInitialState = {
  isLoading: false,
  moviesList: [],
  pageView: "paginate",
  selectedMovie: {} as MovieInfoType,
  totalResults: 0,
  errorText: "",
  currentPage: 1,
  searchText: "",
  login: {
    isLoggedIn: false,
  },
};

export const fetchMoviesList = createAsyncThunk(
  "movies/fetchMoviesList",
  async (params?: { searchText?: string; page?: number; type?: CategoryType }) => {
    const response = await axios.get(
      `${baseUrl}type=${params?.type || "movies"}&s=${params?.searchText || "Spider Man"}&page=${
        params?.page || 1
      }`
    );
    return response?.data as SearchResponse;
  }
);

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
      state.selectedMovie = {} as MovieInfoType;
    },
    setPageView: (
      state: MoviesInitialState,
      action: PayloadAction<"paginate" | "infinite_sroll">
    ) => {
      state.pageView = action.payload;
    },
    setCurerntPage: (state: MoviesInitialState, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchText: (state: MoviesInitialState, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setLoginInfo: (
      state: MoviesInitialState,
      action: PayloadAction<{ isLoggedIn: boolean; userName: string }>
    ) => {
      state.login.isLoggedIn = action.payload.isLoggedIn;
      state.login.userName = action.payload.userName;
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
          state.errorText = "";
          state.totalResults = action?.payload?.totalResults
            ? Number(action.payload.totalResults)
            : 0;
          if (state.pageView === "infinite_sroll" && state.currentPage > 1) {
            state.moviesList = state.moviesList.concat(action.payload.Search);
          } else {
            state.moviesList = action.payload.Search;
          }
        } else {
          state.errorText = action.payload.Error;
        }
      })
      .addCase(fetchMoviesList.rejected, (state: MoviesInitialState, action) => {
        state.isLoading = false;
        toast.error(`Oops! ${action.error.message}`);
        state.errorText = action.error.message as string;
      })
      .addCase(fetchMovieInfo.pending, (state: MoviesInitialState) => {
        state.isLoading = true;
      })
      .addCase(fetchMovieInfo.fulfilled, (state: MoviesInitialState, action) => {
        state.isLoading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieInfo.rejected, (state: MoviesInitialState, action) => {
        state.isLoading = false;
        toast.error(`Oops! ${action.error.message}`);
        state.errorText = action.error.message as string;
      });
  },
});

export const { resetMoviesList, setPageView, setLoginInfo, setCurerntPage, setSearchText } =
  movieSlicer.actions;

export default movieSlicer.reducer;
