import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DataTable, Searchbar } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";

export default function ContactList({ navigation }) {
  let[contacts, setContacts] = useState([]);
  const getList = async () => {
    {
      const response = await fetch(`http://localhost:3000/contacts`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();
      json = json.sort((a, b) => {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
      setContacts(json);
    }
  };

  const deleteContact = async (id) => {
    const response = await fetch(`http://localhost:3000/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigation.navigate("Home");
  };

  const renderHiddenItem = (data) => (
    <View
      style={styles.rowBack}
    >
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          navigation.navigate("Edit",{obj:data.item})
        }}
      >
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {deleteContact(data.item.id)}}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const [search,setSearch] = useState([]);
  const Search = (e)=>{
    let searched = [];
    contacts.map((item) =>{
      if(item.name.toUpperCase().includes(e.target.value.toUpperCase())){
        searched.push(item);
      }
    })
    setSearch(searched);
  }

  useEffect(() => {
    getList();
  }, [contacts]);

  return (
    <SafeAreaView style={ styles.container}>
              <Searchbar placeholder="Search a contact" onChange={Search} />
        <SwipeListView
          style={{
            textAlign: "center",
            margin: "20px",
          }}
          data={search.length === 0 ? contacts : search}
          disableRightSwipe
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.rowFront}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Edit", { obj: item });
                    }}
                  >
                    <Text>
                      <DataTable>
                        <DataTable.Row>
                          <DataTable.Cell>
                            <Image
                              source={{
                                uri:
                                  item.image === null
                                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Solid_grey.svg/2048px-Solid_grey.svg.png"
                                    : item.image,
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
                          <DataTable.Cell>
                            <Image
                              source={{
                                uri:
                                  item.favourite === "yes"
                                    ? "https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
                                    : "",
                              }}
                              style={{ width: 10, height: 10 }}
                            ></Image>
                          </DataTable.Cell>
                        </DataTable.Row>
                      </DataTable>
                    </Text>
                  </TouchableOpacity>
                  </View>
              </View>
            );
          }}
          renderHiddenItem={renderHiddenItem}
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
