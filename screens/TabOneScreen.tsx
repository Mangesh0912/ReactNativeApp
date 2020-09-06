import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  GestureResponderEvent,
  Text,
  View,
  Button,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { observer, inject } from "mobx-react";
import TabTwoScreen from "./TabTwoScreen";
import MovieStore from "../store/MovieStore";
import RootStore from "../store/RootStore";
import { NavigationProp } from "../types";
import { ParamListBase } from "@react-navigation/core";
import {
  ICategoryDetails,
  setCurrentSelectedGenreId,
  setCounter,
  getCounter,
  ICategoryDisplay,
} from "../common/common";
import { toJS } from "mobx";

export interface ICategoryProps {
  navigation: NavigationProp;
}

export interface IParamList extends ParamListBase {}

const TabOneScreen = (props: any) => {
  const movieStore = useContext(RootStore);
  const [categories, setCategories] = useState<ICategoryDetails[]>([]);

  useEffect(() => {
    movieStore.getCategories();
  }, [movieStore]);

  const navigateToFavoriteMoviesScreen = () => {
    props.navigation.navigate("TabFour");
  };

  const _renderItem = ({ item }: ICategoryDisplay) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCurrentSelectedGenreId(item.id.toString());
          setCounter(0);
          props.navigation.navigate("TabTwo");
        }}
      >
        <Text style={styles.item}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.listcontainer}>
      <Button
        title="Check Favorite Movies"
        onPress={navigateToFavoriteMoviesScreen}
      ></Button>
      <FlatList
        data={movieStore.categories}
        renderItem={_renderItem}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  hidden: {
    display: "none",
  },
});

export default observer(TabOneScreen);
