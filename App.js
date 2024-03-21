import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./app/Navigators/DrawerNavigator";
const MyStack = ({ navigation }) => {
  return (
    
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>
  
  );
};
export default MyStack;
