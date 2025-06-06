export type CategoryType = "movie" | "series" | "episode";

export type MovieType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: CategoryType;
  Poster: string;
};

export type OmdbResponseType = {
  Search: MovieType[];
  totalResults: string;
  Response: "True";
};

export type RatingType = {
  Source: string;
  Value: string;
};

export type MovieInfoType = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: RatingType[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: CategoryType;
  totalSeasons?: string;
  Response: "True" | "False";
};
