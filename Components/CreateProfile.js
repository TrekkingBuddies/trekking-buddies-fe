import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../configs/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile, } from "firebase/auth";
import DropDownPicker from "react-native-dropdown-picker";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import { SvgXml } from "react-native-svg";
import CheckBox from "react-native-check-box";
import getCurrentLocation from "../utils/getCurrentLocation";
import styles from "../styles/createProfileStyles";
import postUser from "../utils/postUser";
import { useNavigation } from "@react-navigation/native";
LogBox.ignoreLogs(["VirtualizedLists should never be nested inside"]);

export default function CreateProfile() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [skillLevel, setSkillLevel] = useState(null);
  const [items, setItems] = useState([
    { label: "Novice", value: "novice" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Pro", value: "pro" },
  ]);
  const [selectedAvatar, setSelectedAvatar] = useState("Hiker1");
  const avatarIcons = [
    { id: "1", seed: "Hiker1" },
    { id: "2", seed: "Hiker2" },
    { id: "3", seed: "Hiker3" },
    { id: "4", seed: "Hiker4" },
    { id: "5", seed: "Hiker5" },
    { id: "6", seed: "Hiker6" },
  ];
  const [uphill, setUphill] = useState(false);
  const [flat, setFlat] = useState(false);
  const [countryside, setCountryside] = useState(false);
  const [dogFriendly, setDogFriendly] = useState(false);

  const signUp = async () => {
    if (!username) {
      alert("Please enter a username");
      return;
    }
    setLoading(true);

    const latLong = await getCurrentLocation(city);
    const preferences = [];
    if (uphill) preferences.push("uphill");
    if (flat) preferences.push("flat");
    if (countryside) preferences.push("countryside");
    if (dogFriendly) preferences.push("dog friendly");
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;
      const uid = user.uid;
      const token = await user.getIdToken();
      console.log("token in create profile", token);

      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      const userData = {
        avatar_id: selectedAvatar,
        username: username,
        bio: bio,
        location: city,
        email: email,
        skill_level: skillLevel,
        latLong: latLong,
        preferences: preferences,
      };
      await updateProfile(user, {
        photoURL: selectedAvatar
      });
      await postUser(userData, headers);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create your profile</Text>

        <View style={styles.avatarContainer}>
          {avatarIcons.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedAvatar(item.seed)}
            >
              <View
                style={[
                  styles.avatarIcon,
                  selectedAvatar === item.seed && styles.selected,
                ]}
              >
                <SvgXml
                  xml={createAvatar(identicon, { seed: item.seed }).toString()}
                  width={50}
                  height={50}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />

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
          <View
            style={{
              borderBottomWidth: 2.25,
              borderBottomColor: "#52796f",
              marginTop: 10,
              marginBottom: 20,
              width: "80%",
              alignSelf: "center",
            }}
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
        </View>
        <View
          style={{
            borderBottomWidth: 2.25,
            borderBottomColor: "#52796f",
            marginTop: 20,
            width: "80%",
            alignSelf: "center",
          }}
        />
        <Text style={styles.plainText}>Pick your preferences</Text>
        <View style={styles.preferencesContainer}>
          <View style={styles.selectContainer}>
            <CheckBox
              onClick={() => {
                setUphill(!uphill);
              }}
              isChecked={uphill}
            />
            <Text style={{ flex: 0, margin: 1 }}>uphill</Text>
          </View>
          <View style={styles.selectContainer}>
            <CheckBox
              onClick={() => {
                setFlat(!flat);
              }}
              isChecked={flat}
            />
            <Text style={{ flex: 0, margin: 1 }}>flat</Text>
          </View>
          <View style={styles.selectContainer}>
            <CheckBox
              onClick={() => {
                setCountryside(!countryside);
              }}
              isChecked={countryside}
            />
            <Text style={{ flex: 0, margin: 1 }}>countryside</Text>
          </View>
          <View style={styles.selectContainer}>
            <CheckBox
              onClick={() => {
                setDogFriendly(!dogFriendly);
              }}
              isChecked={dogFriendly}
            />
            <Text style={{ flex: 0, margin: 1 }}>dog friendly</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => signUp()}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <View
          style={{
            borderBottomWidth: 2.25,
            borderBottomColor: "#52796f",
            marginTop: 28,
            width: "80%",
            alignSelf: "center",
          }}
        />
        <Text style={{ textAlign: "center", margin: 20, marginTop: 15, fontSize: 16 }}>
          {" "}
          Or you already our <Text style={styles.buddy}>Buddy</Text>?{" "}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{color: '#52796f',
        fontSize: 15,
        fontWeight: "bold",
        alignSelf: "center", marginTop: -13}}>Sign in</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
