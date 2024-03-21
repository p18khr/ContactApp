import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { FavStackNavigator, MainStackNavigator } from "./StackNavigator";



const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{swipeEnabled:true}}>
      <Drawer.Screen
        name="Contact"
        options={{ headerTitle: "ContactApp", headerTitleAlign: "center" }}
        component={MainStackNavigator}
      />
      <Drawer.Screen
        name="Favourites"
        options={{ headerTitle: "ContactApp", headerTitleAlign: "center" }}
        component={FavStackNavigator}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;