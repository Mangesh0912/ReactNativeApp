import { observable, action } from "mobx";
import * as constants from "../constants/constants";
import {
  ICategoryDetails,
  ICategoryResponse,
  IMovieListDetails,
  IMovieListResponse,
  IMovieDetails,
  setCounter,
  getCounter,
  IMovieObject,
} from "../common/common";
import { createContext } from "react";
import { toJS } from "mobx";
import fetch from "isomorphic-fetch";

class MovieStore {
  @observable
  categories: ICategoryDetails[] = [];

  @observable
  movieList: IMovieListDetails[] = [];

  @observable
  recordsPerPage: number = 0;

  @observable
  totalPages: number = 0;

  @observable
  movieObjects: IMovieObject[] = [];

  @observable
  movieInformation: IMovieDetails = {
    overview: "",
    original_title: "",
    release_date: "",
    tagline: "",
  };

  @action
  async getCategories() {
    try {
      let url = constants.FETCH_CATEGORIES_URL;
      url = url.replace(":api_key", constants.API_KEY);
      let response = await fetch(url);
      let data: ICategoryResponse = await response.json();
      this.categories = toJS(data.genres);
    } catch (err) {
      console.error("Error occurred is:", err);
      throw err;
    }
  }

  @action
  async getMoviesFromGenreSelected(genreId: string, pageNo: string) {
    try {
      let url = constants.FETCH_MOVIES_URL;
      url = url.replace(":api_key", constants.API_KEY);
      url = url.replace(":genre_id", genreId);
      url = url.replace(":page_no", pageNo);
      let response = await fetch(url);
      let data: IMovieListResponse = await response.json();
      this.totalPages = data.total_pages;
      this.movieList = toJS(data.results);
      this.recordsPerPage = data.results.length;
    } catch (err) {
      console.error("Error occurred is:", err);
      throw err;
    }
  }

  @action
  async getMovieDescription(movieId: string) {
    try {
      let url = constants.FETCH_MOVIE_INFORMATION;
      url = url.replace(":api_key", constants.API_KEY);
      url = url.replace(":movie_id", movieId);
      let response = await fetch(url);
      let data: IMovieDetails = await response.json();
      this.movieInformation = toJS(data);
    } catch (err) {
      console.error("Error occurred is:", err);
      throw err;
    }
  }

  addToFavorites(movieObject: IMovieObject) {
    this.movieObjects.push(movieObject);
  }

  removeFromFavorites(movieObject: IMovieObject) {
    this.movieObjects = this.movieObjects.filter(
      (v) => v.id !== movieObject.id
    );
  }
}

export default MovieStore;
//export default createContext(new MovieStore());
