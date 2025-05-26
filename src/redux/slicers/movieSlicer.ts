import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

import { baseUrl } from "helpers/utils";
import { Categories, MovieInfoType, MovieType } from "helpers/sharedTypes";

type SearchResponse = {
  Search: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: Categories;
    Poster: string;
  }[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
};

type MoviesInitialState = {
  isLoading: boolean;
  moviesList: SearchResponse["Search"];
  selectedCategory: Categories;
  selectedMovie: MovieInfoType;
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
  selectedCategory: "movie",
  selectedMovie: {} as MovieInfoType,
  totalResults: 0,
  errorText: "",
  login: {
    isLoggedIn: false,
  },
};

export const fetchMoviesList = createAsyncThunk(
  "movies/fetchMoviesList",
  async (params?: { searchText?: string; page?: number; type?: Categories }) => {
    // const response = await axios.get(
    //   `${baseUrl}type=${params?.type || "movies"}&s=${params?.searchText || "Spider Man"}&page=${
    //     params?.page || 1
    //   }`
    // );

    const res = {
      Search: [
        {
          Title: "Beta Test",
          Year: 2016,
          imdbID: "tt4244162",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BZjhlM2ZhMzUtMzU4ZC00ZjAyLWIxZmYtOWY4N2RlMWEzYTcwXkEyXkFqcGc@._V1_SX300.jpg",
        },
        {
          Title: "The Beta Test",
          Year: 2021,
          imdbID: "tt11738830",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BZTBhNjcyMjEtM2NiMi00YzQ3LThlYjEtMjFiNDc3NWJiNGJiXkEyXkFqcGc@._V1_SX300.jpg",
        },
        {
          Title: "Test Pilot",
          Year: 1938,
          imdbID: "tt0030848",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BZjllOWNkMWUtODVmYi00YzdkLWI4OWYtMGYyOTYzYTM4NzdhXkEyXkFqcGc@._V1_SX300.jpg",
        },
        {
          Title: "Test",
          Year: 2013,
          imdbID: "tt2407380",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMTQwMDU5NDkxNF5BMl5BanBnXkFtZTcwMjk5OTk4OQ@@._V1_SX300.jpg",
        },
        {
          Title: "Test",
          Year: 2025,
          imdbID: "tt27477888",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BNTAyZTkxZjItMzI0Yi00YmMyLWI4ZjgtZTk2YzA1OTVmZmE4XkEyXkFqcGc@._V1_SX300.jpg",
        },
        {
          Title: "The Test",
          Year: 2012,
          imdbID: "tt1986180",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMTYwNTgzMjM5M15BMl5BanBnXkFtZTcwNDUzMTE1OA@@._V1_SX300.jpg",
        },
        {
          Title: "El Test",
          Year: 2022,
          imdbID: "tt15502648",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BM2U1MmQ0ZDUtNGU0My00NDg1LWE2ZDEtNWRmMjhkODUzNDYxXkEyXkFqcGc@._V1_SX300.jpg",
        },
        {
          Title: "The Test",
          Year: 2013,
          imdbID: "tt2616114",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMjMzMDQwMzM2M15BMl5BanBnXkFtZTcwMzA1OTg1OQ@@._V1_SX300.jpg",
        },
        {
          Title: "This Is Not a Test",
          Year: 1962,
          imdbID: "tt0183884",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BOTU5MDkwNDAzOV5BMl5BanBnXkFtZTgwNjE4NDgwMzE@._V1_SX300.jpg",
        },
        {
          Title: "Test Pattern",
          Year: 2019,
          imdbID: "tt10121508",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMWNiMmFiMTgtYjM2Ni00NzQxLWI1NTgtNWE5YmNkOTAyZDEwXkEyXkFqcGc@._V1_SX300.jpg",
        },
      ],
      totalResults: "881",
      Response: "True",
    };

    // return response?.data as SearchResponse;
    return res as unknown as SearchResponse;
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
    setSelectedCategory: (
      state: MoviesInitialState,
      action: PayloadAction<Categories>
    ) => {
      state.selectedCategory = action.payload;
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
          if (state.pageView === "infinite_sroll") {
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

export const { resetMoviesList, setPageView, setLoginInfo, setSelectedCategory } = movieSlicer.actions;

export default movieSlicer.reducer;
