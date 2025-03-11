import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import getHikerById from "../utils/getHikerById";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  LogBox,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import patchHikerById from "../utils/patchHikerById";
import getCurrentLocation from "../utils/getCurrentLocation";
import { updateEmail, deleteUser, updatePassword } from "firebase/auth";
import deleteHikerById from "../utils/deleteHikerById";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import { SvgXml } from "react-native-svg";
import styles from "../styles/profileStyles";
import CheckBox from "react-native-check-box";
LogBox.ignoreLogs(["VirtualizedLists should never be nested inside"]);

export default function Profile() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [hiker, setHiker] = useState(null);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [skillLevel, setSkillLevel] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
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

  useEffect(() => {
    async function fetchUser() {
      if (!user) {
        console.log("User not available");
        return;
      }
      setLoading(true);
      try {
        const uid = user.uid;
        const tokenRequest = await user.getIdToken();
        setToken(tokenRequest);
        const hikerResponse = await getHikerById(tokenRequest, uid);
        setSelectedAvatar(hikerResponse?.user?.avatar_id);
        setHiker(hikerResponse);
        setUserId(uid);
        setUsername(hikerResponse?.user?.username || "");
        setEmail(hikerResponse?.user?.email || "");
        setBio(hikerResponse?.user?.bio || "");
        setLocation(hikerResponse?.user?.location || "");
        setSkillLevel(hikerResponse?.user?.skill_level || null);
        hikerResponse.user.preferences.forEach((preference) => {
          if (preference === "uphill") setUphill(true)
          if (preference === "flat") setFlat(true)
          if (preference === "countryside") setCountryside(true)
          if (preference === "dog friendly") setDogFriendly(true)
          })
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [user]);

  async function updateProfile() {
    const latLong = await getCurrentLocation(location);
    const preferences = [];
    if (uphill) preferences.push("uphill");
    if (flat) preferences.push("flat");
    if (countryside) preferences.push("countryside");
    if (dogFriendly) preferences.push("dog friendly");

    const userData = {
      avatar_id: selectedAvatar,
      username: username,
      bio: bio,
      location: location,
      email: email,
      skill_level: skillLevel,
      latLong: latLong,
      preferences: preferences,
    };

    if (user && user.email !== email) {
      try {
        await updateEmail(user, email);
      } catch (error) {
        console.log("error updating email", error);
        alert(error);
        return;
      }
    }

    if (password === passwordCheck) {
      try {
        await updatePassword(user, password);
      } catch (error) {
        console.log(error);
        alert(error);
        return;
      }
    } else {
      alert("passwords don't match");
      return;
    }

    try {
      await patchHikerById(token, userId, userData);
      console.log("profile patched");
      setEditing(false);
    } catch (patchError) {
      console.log("profile patch error", patchError);
      setEditing(false);
    }
  }

  async function deleteProfile() {
    try {
      deleteHikerById(token, userId);
    } catch (error) {
      console.log(error);
      return;
    }
    try {
      await deleteUser(user);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {loading ? (
          <ActivityIndicator size="large" color="#52796f"></ActivityIndicator>
        ) : hiker ? (
          <>
            <View style={styles.avatarContainer}>
              {!editing ? (
                <View style={styles.avatarIcon}>
                  <SvgXml
                    xml={createAvatar(identicon, {
                      seed: selectedAvatar,
                    }).toString()}
                    width={50}
                    height={50}
                  />
                </View>
              ) : (
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
                          xml={createAvatar(identicon, {
                            seed: item.seed,
                          }).toString()}
                          width={50}
                          height={50}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <Text>Username:</Text>
            <TextInput
              style={[
                styles.input,
                editing ? styles.inputEditable : styles.inputNonEditable,
              ]}
              editable={editing}
              value={username}
              onChangeText={(text) => editing && setUsername(text)}
            />
            <Text>Email:</Text>
            <TextInput
              style={[
                styles.input,
                editing ? styles.inputEditable : styles.inputNonEditable,
              ]}
              editable={editing}
              value={email}
              onChangeText={(text) => editing && setEmail(text)}
            />
            {editing && (
              <>
                <Text>Password:</Text>
                <TextInput
                  style={[
                    styles.input,
                    editing ? styles.inputEditable : styles.inputNonEditable,
                  ]}
                  editable={editing}
                  value={password}
                  onChangeText={(text) => editing && setPassword(text)}
                  secureTextEntry
                />
                <Text>Retype Password:</Text>
                <TextInput
                  style={[
                    styles.input,
                    editing ? styles.inputEditable : styles.inputNonEditable,
                  ]}
                  editable={editing}
                  value={passwordCheck}
                  onChangeText={(text) => editing && setPasswordCheck(text)}
                  secureTextEntry
                />
              </>
            )}
            <Text>Bio:</Text>
            <TextInput
              style={[
                styles.input_bio,
                editing ? styles.inputEditable : styles.inputNonEditable,
              ]}
              editable={editing}
              value={bio}
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => editing && setBio(text)}
            />
            <Text>Location:</Text>
            <TextInput
              style={[
                styles.input,
                editing ? styles.inputEditable : styles.inputNonEditable,
              ]}
              editable={editing}
              value={location}
              onChangeText={(text) => editing && setLocation(text)}
            />
            <Text>Skill Level:</Text>
            {editing ? (
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
            ) : (
              <View
                style={[
                  styles.inputNonEditable,
                  { padding: 10, width: "80%", alignSelf: "center" },
                ]}
              >
                <Text>{skillLevel}</Text>
              </View>
            )}
            <Text style={styles.plainText}>Your preferences</Text>
              <View style={styles.preferencesContainer}>
                <View style={styles.selectContainer}>
                  <CheckBox
                    disabled = {!editing}
                    onClick={() => {
                      setUphill(!uphill);
                    }}
                    isChecked={uphill}
                  />
                  <Text style={{ flex: 0, margin: 1 }}>uphill</Text>
                </View>
                <View style={styles.selectContainer}>
                  <CheckBox
                    disabled = {!editing}
                    onClick={() => {
                      setFlat(!flat);
                    }}
                    isChecked={flat}
                  />
                  <Text style={{ flex: 0, margin: 1 }}>flat</Text>
                </View>
                <View style={styles.selectContainer}>
                  <CheckBox
                    disabled = {!editing}
                    onClick={() => {
                      setCountryside(!countryside);
                    }}
                    isChecked={countryside}
                  />
                  <Text style={{ flex: 0, margin: 1 }}>countryside</Text>
                </View>
                <View style={styles.selectContainer}>
                  <CheckBox
                    disabled = {!editing}
                    onClick={() => {
                      setDogFriendly(!dogFriendly);
                    }}
                    isChecked={dogFriendly}
                  />
                  <Text style={{ flex: 0, margin: 1 }}>dog friendly</Text>
                </View>
              </View>
          </>
        ) : (
          <Text>Profile not available</Text>
        )}

        {editing ? (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => updateProfile()}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditing(true)}
            >
              <Text style={styles.buttonText}>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteProfile()}
            >
              <Text style={styles.buttonText}>Delete profile</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}