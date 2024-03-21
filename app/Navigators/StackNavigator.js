import { createStackNavigator } from "@react-navigation/stack";
import ContactEdit from "../components/ContactEdit";
import ContactEntry from "../components/ContactEntry";
import ContactList from "../components/ContactList";
import FavList from "../components/FavouriteList";
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ContactList}
        options={{
          headerStyle: { backgroundColor: "grey" },
          headerShadowVisible: true,
          headerTitle: "Contact List",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Entry"
        options={{
          headerStyle: { backgroundColor: "grey" },
          headerShadowVisible: true,
          headerTitle: "Add New Contact",
          headerTitleAlign: "center",
        }}
        component={ContactEntry}
      />
      <Stack.Screen
        name="Edit"
        options={{
          headerStyle: { backgroundColor: "grey" },
          headerShadowVisible: true,
          headerTitle: "Update Contact",
          headerTitleAlign: "center",
        }}
        component={ContactEdit}
      />
    </Stack.Navigator>
  );
};

const FavStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favourite"
        options={{
          headerStyle: { backgroundColor: "grey" },
          headerShadowVisible: true,
          headerTitle: "Favourite Contact List",
          headerTitleAlign: "center",
        }}
        component={FavList}
      />
      <Stack.Screen
        name="Entry"
        options={{
          headerStyle: { backgroundColor: "grey" },
          headerShadowVisible: true,
          headerTitle: "Add New Contact",
          headerTitleAlign: "center",
        }}
        component={ContactEntry}
      />
      <Stack.Screen
        name="Edit"
        options={{
          headerStyle: { backgroundColor: "grey" },
          headerShadowVisible: true,
          headerTitle: "Update Contact",
          headerTitleAlign: "center",
        }}
        component={ContactEdit}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, FavStackNavigator };
