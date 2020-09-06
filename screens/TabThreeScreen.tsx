import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import Navigation from "../navigation";
import { NavigationProp } from "../types";
import MovieStore from "../store/MovieStore";
import RootStore from "../store/RootStore";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import { getCurrentSelectedMovieId } from "../common/common";

const TabThreeScren = (props: any) => {
  const movieStore = useContext(RootStore);
  const [title, setTitle] = useState("");
  const [tagline, setTagLine] = useState("");
  const [overview, setOverview] = useState("");
  const [movieId, setMovieId] = useState(getCurrentSelectedMovieId());
  const [disableAddFavsBtn, setDisableAddFavsBtn] = useState(true);
  const [disableRemoveFavsBtn, setDisableRemoveFavsBtn] = useState(true);

  useEffect(() => {
    fetchMovieInformation(getCurrentSelectedMovieId());
    fetchAddAndRemoveBtnStatus();
  }, [movieStore]);

  const fetchMovieInformation = async (movieId: string) => {
    await movieStore.getMovieDescription(movieId);
    const movieInformation = toJS(movieStore.movieInformation);
    setTitle(movieInformation.original_title);
    setTagLine(movieInformation.tagline);
    setOverview(movieInformation.overview);
  };

  const fetchAddAndRemoveBtnStatus = () => {
    const movieObjectsList = movieStore.movieObjects;
    const movieObject = movieObjectsList.filter((v) => v.id === movieId);
    setDisableAddFavsBtn(movieObject.length > 0 ? true : false);
    setDisableRemoveFavsBtn(movieObject.length > 0 ? false : true);
  };

  const addFavorites = () => {
    movieStore.addToFavorites({
      id: movieId,
      original_title: title,
    });
    setDisableAddFavsBtn(true);
    setDisableRemoveFavsBtn(false);
  };
  const removeFavorites = () => {
    movieStore.removeFromFavorites({
      id: movieId,
      original_title: title,
    });
    setDisableAddFavsBtn(false);
    setDisableRemoveFavsBtn(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>
        {title} - {tagline}
        {"\n"}
        {"\n"}
        <Text style={styles.descriptionText}>
          Description:
          {"\n"}
          <Text>{overview}</Text>
        </Text>
      </Text>
      <Button
        title="Add To Favorites"
        onPress={addFavorites}
        disabled={disableAddFavsBtn}
      ></Button>
      <Button
        title="Remove from Favorites"
        onPress={removeFavorites}
        disabled={disableRemoveFavsBtn}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  baseText: {
    textAlign: "center",
    fontSize: 20,
    padding: 20,
  },
  descriptionText: {
    textDecorationLine: "none",
  },
});

export default TabThreeScren;
