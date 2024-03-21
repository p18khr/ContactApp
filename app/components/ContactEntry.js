import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

const ContactEntry = ({ navigation }) => {
  const [Name, setName] = React.useState("");
  const [mob, setMob] = React.useState("");
  const [landline, setLandline] = React.useState("");
  const [fav, setFav] = useState("no");
  const [selectedImage, setSelectedImage] = useState(null);
  const placeholderImageSource =
    "https://cdn-icons-png.flaticon.com/128/4146/4146794.png";
  let imageSource = placeholderImageSource;

  const addContact = async (name, phone_number, landline_number, favourite,image) => {
    await fetch("http://localhost:3000/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone_number, landline_number, favourite, image }),
    });
  };

  const save = () => {
    if (Name === "" || mob === "" || landline === "") {
      alert("Kindly Fill all the fields");
    } else {
      addContact(Name, mob, landline, fav, selectedImage);
      navigation.navigate("Home");
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }

    imageSource =
      selectedImage !== null ? selectedImage  : placeholderImageSource;
  };

  useEffect(()=>{
    imageSource;
  })

  return (
    <SafeAreaView style={{ margin: "20px", flex: 1 }}>
      <TouchableOpacity
        style={{
          alignSelf: "center"
        }}
        onPress={pickImageAsync}
      >
        <Image
          source={{ uri: (selectedImage !== null ? selectedImage  : placeholderImageSource) }}
          style={{ resizeMode: "contain", width: 50, height: 50 }}
        />
      </TouchableOpacity>

      <Text style={{ fontWeight: "bold" }}> Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        placeholder="Enter Name of the item"
      />
      <Text style={{ fontWeight: "bold" }}> Phone Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMob}
        placeholder="Enter phone number"
        keyboardType="numeric"
        inputMode="numeric"
      />
      <Text style={{ fontWeight: "bold" }}> Landline Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setLandline}
        placeholder="Enter landline number"
        keyboardType="numeric"
        inputMode="numeric"
      />

      <TouchableOpacity
        style={{
          alignSelf: "center",
          backgroundColor: "#DDDDDD",
          padding: "10px",
          marginTop: "10px",
        }}
        onPress={save}
      >
        <Text>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          backgroundColor: "#DDDDDD",
          padding: "10px",
          marginTop: "10px",
        }}
        onPress={() => {
          fav === "no" ? setFav("yes") : setFav("no");
        }}
      >
        <Text>{fav === "no" ? "Add to Favourite" : "Unfavourite"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ContactEntry;
