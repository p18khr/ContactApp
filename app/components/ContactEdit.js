import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const ContactEdit = ({ navigation,route }) => {

  const [Name, setName] = useState(route.params.obj.name);
  const [phone, setPhone] = useState(route.params.obj.phone_number);
  const [landline, setLandline] = useState(route.params.obj.landline_number);
  const [fav,setFav] = useState(route.params.obj.favourite);
  const [selectedImage, setSelectedImage] = useState(route.params.obj.image);
  const placeholderImageSource = route.params.obj.image === null ? "https://cdn-icons-png.flaticon.com/128/4146/4146794.png" : route.params.obj.image;
  let imageSource = placeholderImageSource;

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
      selectedImage !== null ? { selectedImage } : placeholderImageSource;
  };


  const editContact = async (id,name,phone_number,landline_number,favourite,image ) => {
    const response = await fetch(`http://localhost:3000/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name,phone_number,landline_number,favourite,image }), // body data type must match "Content-Type" header
    });

    console.log(response.json());
  };

  const deleteContact = async () => {
    const response = await fetch(`http://localhost:3000/contacts/${route.params.obj.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
   navigation.navigate("Home");
  };

  const save = () => {
    if(Name === '' || phone === "" || landline === ""){
      alert('Kindly Fill all the fields');
    }
    else{
     editContact(route.params.obj.id,Name,phone,landline,fav,selectedImage);
     navigation.navigate('Home');
    }
  };

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
      <Text style={{ fontWeight: "bold" }}>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        placeholder="Enter Name of the item"
        defaultValue={route.params.obj.name}
      />
      <Text style={{ fontWeight: "bold" }}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        keyboardType="numeric"
        inputMode="numeric"
        defaultValue={route.params.obj.phone_number}
      />
      <Text style={{ fontWeight: "bold" }}>Landline Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setLandline}
        placeholder="Enter landline number"
        keyboardType="numeric"
        inputMode="numeric"
        defaultValue={route.params.obj.landline_number}
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
        onPress={()=>{fav === 'no' ? setFav('yes'):setFav('no')}}
      >
        <Text>{fav === 'yes' ? 'Unfavourite':'Add to Favourite'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          backgroundColor: "#DDDDDD",
          padding: "10px",
          marginTop: "10px",
        }}
         onPress={deleteContact}
      >
        <Text>Delete Contact</Text>
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

export default ContactEdit;
