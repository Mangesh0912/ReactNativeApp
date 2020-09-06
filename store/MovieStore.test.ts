import MovieStore from "./MovieStore";
import React, { useState, useEffect, useContext } from "react";
import * as constants from "../constants/constants";
import fetch from "isomorphic-fetch";

describe("MovieStore", () => {
  it("get the movie categories and open movie list when selecting a category", async () => {
    const store = new MovieStore();
    //get the movie categories
    await store.getCategories();
    expect(store.categories.length).toBeGreaterThan(0);

    //get the movie list from categories
    const categoryId = store.categories[0].id;
    const pageNo = 1;
    await store.getMoviesFromGenreSelected(
      categoryId.toString(),
      pageNo.toString()
    );
    expect(store.movieList.length).toBeGreaterThan(0);

    //check the movie description
    const movieId = store.movieList[0].id;
    await store.getMovieDescription(movieId.toString());
    expect(store.movieInformation.original_title).toBeTruthy();
  });
});
