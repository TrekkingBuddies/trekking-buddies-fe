import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { auth } from "../configs/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

export default function Header() {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    "Kodchasan-Medium": require("../assets/fonts/Kodchasan-Medium.ttf"), // Replace with your font file path
  });
  console.log(fontsLoaded);

  const handleSignOut = async () => {
    try {
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
        <Text style={styles.logoText}>Trekking{"\n"}Buddies</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleSignOut()}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#52796f",
    paddingTop: 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#2980b9",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 100,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  logo: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  logoText: {
    fontFamily: "Kodchasan-Medium",
    fontSize: 18,
    lineHeight: 19,
    marginTop: 6,
    color: "white",
  },
  button: {
    backgroundColor: "#2f4f4f",
    padding: 8,
    borderRadius: 5,
    width: "20%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    color: "white",
  },
});
