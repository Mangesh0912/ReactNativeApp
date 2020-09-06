/**
 * @jest-environment jsdom
 */
import TabOneScreen from "./TabOneScreen";
import TabThreeScreen from "./TabThreeScreen";
import App1 from "./App1";
import { shallow, ShallowWrapper, mount, MountRendererProps } from "enzyme";
import React from "react";
import { View, FlatList, TouchableOpacity, Button, Text } from "react-native";
import { create } from "react-test-renderer";
import { createRenderer } from "react-test-renderer/shallow";
import TabThreeScren from "./TabThreeScreen";
import { NavigationProp } from "../types";
import MovieStore from "../store/MovieStore";

const createTestProps = (props: any) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

describe("TabOneScreen", () => {
  describe("rendering", () => {
    let wrapper: ShallowWrapper;
    let props: any;
    let useEffect: any;
    beforeEach(() => {
      props = createTestProps({});
      wrapper = shallow(<TabOneScreen {...props} />);
    });
    it("should render a <View /> and a <FlatList/>", () => {
      expect(wrapper.find(FlatList)).toHaveLength(1);
      expect(wrapper.find(View)).toHaveLength(1);
    });
    it("should test navigation of moving to Favorite Movies Screen from Category Screen", () => {
      const btn = wrapper.find(Button).first();
      expect(btn.props().title).toEqual("Check Favorite Movies");
      btn.simulate("press");
      expect(props.navigation.navigate).toHaveBeenCalledWith("TabFour");
    });
    it("test the FlatList renderFunction", () => {
      const flatList = wrapper.find(FlatList);
      const item = flatList.renderProp("renderItem");
      expect(item).toMatchSnapshot();
    });
  });
});

describe("TabThreeScreen", () => {
  describe("rendering", () => {
    let wrapper: any;
    let props: Object;
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    beforeEach(() => {
      props = createTestProps({});
      wrapper = shallow(<TabThreeScren {...props} />);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should render a view and two buttons", () => {
      expect(wrapper.find("View")).toHaveLength(1);
      expect(wrapper.find("Button")).toHaveLength(2);
    });
    it("should render Add Fav Button and check if state is changed on Press", () => {
      const addFavBtn = wrapper.find(Button).first();
      expect(addFavBtn.props().title).toEqual("Add To Favorites");
      addFavBtn.simulate("press");
      expect(setState).toHaveBeenCalledWith(true);
      expect(setState).toHaveBeenCalledTimes(2);
    });
    it("should render Remove Fav Button and check if state is changed on Press", () => {
      const removeFavBtn = wrapper.find(Button).at(1);
      expect(removeFavBtn.props().title).toEqual("Remove from Favorites");
      removeFavBtn.simulate("press");
      expect(setState).toHaveBeenCalledWith(false);
      expect(setState).toHaveBeenCalledTimes(2);
    });
  });
});
