import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  View,
  Text,
} from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import Navigation from "../navigation";
import { NavigationProp } from "../types";
import MovieStore from "../store/MovieStore";
import RootStore from "../store/RootStore";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import {
  setCurrentSelectedGenreId,
  getCurrentSelectedGenreId,
  setCurrentSelectedMovieId,
  IMovieObject,
} from "../common/common";

export interface IMovieState {
  item: IMovieObject;
}

const TabFourScreen = (props: any) => {
  const movieStore = useContext(RootStore);
  const [movieList, setMovieList] = useState<IMovieObject[]>(
    movieStore.movieObjects
  );

  const deleteFromFavs = () => {};

  const _renderItem = ({ item }: IMovieState) => {
    return (
      <View style={styles.childcontainer}>
        <Text style={styles.item}>{item.original_title}</Text>
        <Button
          title="Remove"
          color="red"
          onPress={() => {
            movieStore.removeFromFavorites({
              id: item.id,
              original_title: item.original_title,
            });
            const newMovieList = movieList.filter((v) => v.id !== item.id);
            setMovieList(newMovieList);
          }}
        ></Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={movieList} renderItem={_renderItem}></FlatList>
    </View>
  );
};

export default TabFourScreen;

const styles = StyleSheet.create({
  button: {},
  childcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    display: "flex",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  container1: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    overflow: "scroll",
  },
  listcontainer: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    fontSize: 20,
  },
  hidden: {
    display: "none",
  },
});
