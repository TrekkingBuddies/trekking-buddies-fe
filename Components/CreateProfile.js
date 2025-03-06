import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet, FlatList
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { auth } from "../configs/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../configs/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import { SvgXml } from 'react-native-svg'
import getCurrentLocation from "../utils/getCurrentLocation";

export default function CreateProfile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [open, setOpen] = useState(false);
  const [skillLevel, setSkillLevel] = useState(null);
  const [items, setItems] = useState([
    { label: "Novice", value: "novice" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Pro", value: "pro" },
  ]);
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const avatarIcons = [{id: "1", seed: "Hiker1"}, {id: "2", seed: "Hiker2"}, {id: "3", seed: "Hiker3"}, {id: "4", seed: "Hiker4"}, {id: "5", seed: "Hiker5"},  {id: "6", seed: "Hiker6"}]
  

  const signUp = async () => {
    setLoading(true);

    const latLong = await getCurrentLocation(city);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;
    //   const uid = user.uid;
      const token = await user.getIdToken();
    //   console.log("token in create profile", token);

      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      const userData = {
        bio: bio,
        email: email,
        skill_level: skillLevel,
        city: city,
        latLong: latLong
      };

      await axios
        .post("https://trekking-buddies.onrender.com/api/users", userData, {
          headers,
        })
        .then((response) => {
          console.log("response in axios post", response);
          alert("Signed up!");
        })
        .catch((error) => {
          alert("Post request failed to sign up");
          console.log("error in axios post", error);
        });

      // TO SEND FROM FRONT-END DIRECTLY, NOT NEEDED UNLESS BACK-END BREAKS.
      // await setDoc(doc(db, 'users', uid), {
      //     bio: bio,
      //     location: location,
      //     email: email,
      //     skill_level: skillLevel
      // });
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>CreateProfile</Text>
      
        <View style={styles.avatarContainer}>
        <FlatList
          data={avatarIcons}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.avatarIcon,
                selectedAvatar === item.seed && styles.selectedAvatar, 
              ]}
              onPress={() => setSelectedAvatar(item.seed)}
            >
              <SvgXml
                xml={createAvatar(identicon, { seed: item.seed }).toString()}
                width={50}
                height={50}
              />
            </TouchableOpacity>
          )}
        />
      </View>
          
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <TextInput
          style={styles.input_bio}
          placeholder="BIO"
          onChangeText={(text) => setBio(text)}
          value={bio}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          onChangeText={(text) => setCity(text)}
          value={city}
        />
        <DropDownPicker
          open={open}
          value={skillLevel}
          items={items}
          setOpen={setOpen}
          setValue={setSkillLevel}
          setItems={setItems}
          placeholder="Select Skill level"
          style={styles.dropdown}
          textStyle={styles.dropdowntext}
        />
        <TouchableOpacity style={styles.button} onPress={() => signUp()}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#cad2c5",
    minHeight: "100%",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input_bio: {
    width: "80%",
    height: 80,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#52796f",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  dropdown: {
    width: "80%",
    alignSelf: "center",
    borderColor: "gray",
    backgroundColor: "none",
  },
  dropdowntext: {
    color: "grey",
  },
  avatarContainer: {
    width: "100%", // Ensure it takes full width
    alignItems: "center",
  },
  avatarIcon: {
    padding: 10,
    margin: 5,
    borderWidth: 3,
    borderColor: "transparent", // Default no border
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50, // Circular shape
    backgroundColor: "white", // White background
    width: 70,
    height: 70,
  },
  selected: {
    borderColor :"grey",
  }
});
