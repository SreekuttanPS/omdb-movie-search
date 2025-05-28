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
    console.log("hit params: ", params);

    const response = await axios.get(
      `${baseUrl}type=${params?.type || "movies"}&s=${params?.searchText || "Spider Man"}&page=${
        params?.page || 1
      }`
    );

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
  const res = {
    Title: "Beta Test",
    Year: "2016",
    Rated: "Not Rated",
    Released: "22 Jul 2016",
    Runtime: "88 min",
    Genre: "Action, Sci-Fi, Thriller",
    Director: "Nicholas Gyeney",
    Writer: "Nicholas Gyeney, André Kirkman",
    Actors: "Manu Bennett, Larenz Tate, Linden Ashby",
    Plot: "While testing the latest first person shooter from global game developer, Sentinel, video game champion Max Troy discovers the events happening within the game are being reflected in the real world. He soon determines that the game's protagonist is real-life Orson Creed, an ex-Sentinel employee who is being remotely controlled by the corporation for reasons unknown. As virtual and real worlds collide, Max and Creed must join forces to unravel the conspiracy before the game's sinister events escalate and overwhelm the city.",
    Language: "English",
    Country: "United States",
    Awards: "N/A",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZjhlM2ZhMzUtMzU4ZC00ZjAyLWIxZmYtOWY4N2RlMWEzYTcwXkEyXkFqcGc@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "4.8/10",
      },
    ],
    Metascore: "N/A",
    imdbRating: "4.8",
    imdbVotes: "22,113",
    imdbID: "tt4244162",
    Type: "movie",
    DVD: "N/A",
    BoxOffice: "$10,104",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  };
  return res as MovieInfoType;
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

export const { resetMoviesList, setPageView, setLoginInfo, setCurerntPage, setSearchText } = movieSlicer.actions;

export default movieSlicer.reducer;
