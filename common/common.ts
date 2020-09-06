export interface ICategoryDetails {
  id: number;
  name: string;
}

export interface ICategoryResponse {
  genres: ICategoryDetails[];
}

export interface ICategoryDisplay {
  item: ICategoryDetails;
}

export interface IMovieListDetails {
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieListResponse {
  results: IMovieListDetails[];
  total_pages: number;
}

export interface IMovieDetails {
  overview: string;
  original_title: string;
  release_date: string;
  tagline: string;
}

export interface IMovieObject {
  id: string;
  original_title: string;
}

let currentSelectedGenreId = "0";
let currentSelectedMovieId = "0";
let counter = 0;

export function setCurrentSelectedGenreId(newValue: string): void {
  currentSelectedGenreId = newValue;
}

export function getCurrentSelectedGenreId(): string {
  return currentSelectedGenreId;
}

export function setCurrentSelectedMovieId(movieId: string): void {
  currentSelectedMovieId = movieId;
}

export function getCurrentSelectedMovieId(): string {
  return currentSelectedMovieId;
}

export function setCounter(counterValue: number) {
  counter = counterValue;
}

export function getCounter() {
  return counter;
}
