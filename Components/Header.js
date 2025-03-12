import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { auth } from "../configs/firebaseConfig";
import { signOut } from "firebase/auth";
import { useFonts } from "expo-font";
import client from "../configs/streamChatClient"
import styles from "../styles/headerStyles";

export default function Header() {
  let [fontsLoaded] = useFonts({
    "Kodchasan-Medium": require("../assets/fonts/Kodchasan-Medium.ttf"),
  });

  const handleSignOut = async () => {
    try {
      await client.disconnectUser();
      await signOut(auth);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <Image
          source={require("../assets/logo.webp")}
          style={{ height: 50, width: 50, resizeMode: "contain" }}
        />
        <Text style={{
          fontFamily: "Kodchasan-Medium",
          fontSize: 17,
          lineHeight: 19,
          marginTop: 6,
          color: "white",
        }}>Trekking{"\n"}Buddies</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleSignOut()}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}