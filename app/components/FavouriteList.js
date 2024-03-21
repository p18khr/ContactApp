import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DataTable } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import { FlatList } from "react-native-web";

export default function FavList({ navigation }) {
  let [contacts, setContacts] = useState([]);

  const getList = async () => {
    {
      const response = await fetch(`http://localhost:3000/contacts`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setContacts(json);
    }
  };


  useEffect(() => {
    getList();
  }, [contacts]);

  return (
    <SafeAreaView style={styles.container}>
        <FlatList
          style={{ textAlign: "center", margin: "20px" }}
          data={
            (contacts = contacts.sort((a, b) => {
              var textA = a.name.toUpperCase();
              var textB = b.name.toUpperCase();
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            }))
          }
          renderItem={({ item, index }) => {
            if(item.favourite === 'yes') {return (
              <View style={styles.rowFront}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Edit", { obj: item });
                    }}
                  >
                   <DataTable>
                        <DataTable.Row>
                          <DataTable.Cell>
                            <Image
                              source={{
                                uri: (item.image === null ? "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Solid_grey.svg/2048px-Solid_grey.svg.png": item.image),
                              }}
                              style={{
                                width: 30,
                                height: 30,
                                flex: 1,
                                borderRadius: "20px",
                              }}
                            ></Image>
                          </DataTable.Cell>
                          <DataTable.Cell>{item.name}</DataTable.Cell>
                        </DataTable.Row>
                      </DataTable>
                  </TouchableOpacity>
                </View>
              </View>
            );}
          }}
        />
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            marginBottom:'10px',
            marginRight:'10px'
          }}
          onPress={() => navigation.navigate("Entry")}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/401/401061.png",
            }}
            style={{ resizeMode: "contain", width: 50, height: 50 }}
          ></Image>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});

