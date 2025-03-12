import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  LogBox,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import { auth } from "../configs/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import DropDownPicker from "react-native-dropdown-picker";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import { SvgXml } from "react-native-svg";
import CheckBox from "react-native-check-box";
import getCurrentLocation from "../utils/getCurrentLocation";
import styles from "../styles/createProfileStyles";
import postUser from "../utils/postUser";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import client from "../configs/streamChatClient";

LogBox.ignoreLogs(["VirtualizedLists should never be nested inside"]);

export default function CreateProfile() {
  const { setAvatar } = useContext(UserContext);
  const { setCurrentUsername } = useContext(UserContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
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
    if (!city) {
      alert("Please enter a city");
      return;
    }
    if (!skillLevel) {
      alert("Please choose you skill level");
      return;
    }
    if (password !== passwordCheck) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);

    const latLong = await getCurrentLocation(city);
    if (!latLong) {
      alert("Cannot find the city. Check you location again");
      setLoading(false);
      return;
    }
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

      setAvatar(selectedAvatar);
      const user = response.user;
      const token = await user.getIdToken();
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
      postUser(userData, headers);
      await client.connectUser(
        {
          id: user.uid,
          name: username,
        },
        client.devToken(user.uid)
      );
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          alert("Email is wrong. Please check your email");
          break;
        case "auth/invalid-credential":
          alert("Incorrect password. Please try again");
          break;
        case "auth/missing-password":
          alert("Please enter your password");
          break;
        case "auth/password-does-not-meet-requirements":
          alert(
            "Password does not meet requirments: at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special char, 6 symbols total"
          );
          break;
        case "auth/email-already-in-use":
          alert("Email is already in use");
          break;
        default:
          alert(`Authentication failed: ${error.message}`);
          break;
      }
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
            onChangeText={(text) => [setUsername(text)]}
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
          <TextInput
            style={styles.input}
            placeholder="Retype Password"
            onChangeText={(text) => setPasswordCheck(text)}
            value={passwordCheck}
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

        {loading ? <ActivityIndicator size="large" color="#52796f" /> : null}

        <View
          style={{
            borderBottomWidth: 2.25,
            borderBottomColor: "#52796f",
            marginTop: 28,
            width: "80%",
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            textAlign: "center",
            margin: 20,
            marginTop: 15,
            fontSize: 16,
          }}
        >
          {" "}
          Or you already our <Text style={styles.buddy}>Buddy</Text>?{" "}
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              color: "#52796f",
              fontSize: 15,
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: -13,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
