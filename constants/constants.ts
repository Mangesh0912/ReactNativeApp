export const FETCH_CATEGORIES_URL =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=:api_key&language=en-US";
export const API_KEY = "9c972648f57bb1454c4a75e4c2f3d3dd";
export const FETCH_MOVIES_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=:api_key&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=:page_no&with_genres=:genre_id";
export const FETCH_MOVIE_INFORMATION =
  "https://api.themoviedb.org/3/movie/:movie_id?api_key=:api_key";
