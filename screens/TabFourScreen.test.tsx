/**
 * @jest-environment jsdom
 */
import { shallow, ShallowWrapper, mount, MountRendererProps } from "enzyme";
import TabFourScreen from "./TabFourScreen";
import { View, FlatList, TouchableOpacity, Button, Text } from "react-native";
import React from "react";

const createTestProps = (props: any) => ({
  ...props,
});

describe("TabFourScreen", () => {
  describe("rendering", () => {
    let wrapper: any;
    let props: any;
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    beforeEach(() => {
      props = createTestProps({});
      wrapper = mount(<TabFourScreen {...props} />);
    });
    it("should render a View and a Button", () => {
      expect(wrapper.find(View)).toHaveLength(2);
      expect(wrapper.find(FlatList)).toHaveLength(1);
    });
  });
});
