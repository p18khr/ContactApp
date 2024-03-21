import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, FavStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Contact"
        options={{ headerTitle: "ContactApp", headerTitleAlign: "center" }}
        component={MainStackNavigator}
      />
      <Tab.Screen
        name="Favourites"
        options={{ headerTitle: "ContactApp", headerTitleAlign: "center" }}
        component={FavStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
