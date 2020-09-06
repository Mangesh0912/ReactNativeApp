import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
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
} from "../common/common";

export interface IMovieListProps {
  navigation: NavigationProp;
}

export interface IMovieListState {
  id: number;
  title: string;
}

export interface IMovieListDisplay {
  item: IMovieListState;
}

const TabTwoScreen = (props: any) => {
  const [genreId, setGenreId] = useState(0);
  const [pageNo, setPageNo] = useState("1");
  const [movieList, setMovieList] = useState<IMovieListState[]>([]);
  const movieStore = useContext(RootStore);

  useEffect(() => {
    fetchMovieListByGenreId("1");
  }, [movieStore]);

  const fetchMovieListByGenreId = async (pageNo: string) => {
    await movieStore.getMoviesFromGenreSelected(
      getCurrentSelectedGenreId(),
      pageNo
    );
    setMovieList([...movieList, ...movieStore.movieList]);
  };

  const navigateToCategoryScreen = () => {
    props.navigation.goBack();
  };

  const _renderItem = ({ item }: IMovieListDisplay) => (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("TabThree");
        setCurrentSelectedMovieId(item.id ? item.id.toString() : "0");
      }}
    >
      <Text style={styles.item}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    let pageNumber = Number.parseInt(pageNo) + 1;
    const totalPages = movieStore.totalPages;
    if (pageNumber > totalPages) {
      return;
    }
    setPageNo(pageNumber.toString());
    fetchMovieListByGenreId(pageNo);
  };

  return (
    <View style={styles.listcontainer}>
      <FlatList
        data={movieList}
        renderItem={_renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={movieStore.recordsPerPage}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  hidden: {
    display: "none",
  },
  listcontainer: {
    flex: 1,
    paddingTop: 22,
  },
});

export default observer(TabTwoScreen);
