import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { Platform } from "react-native";
import styles from "../styles/loginScreenStyle";
import client from "../configs/streamChatClient";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
      const uid = user.uid;
      await client.connectUser(
        {
          id: uid,
          name: uid,
        },
        client.devToken(uid)
      );
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("User not found. Please check your email");
          break;
        case "auth/invalid-email":
          alert("Email is wrong. Please check your email");
          break;
        case "auth/invalid-credential":
          alert("Incorrect password. Please try again");
          break;
        case "auth/missing-password":
          alert("Please enter your password");
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
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/hiking.png")}
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.header}>
            Hey<Text style={styles.buddy}> Buddy</Text>,
          </Text>
          <Text style={styles.subheader}>Welcome back</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />

          <TouchableOpacity style={styles.button} onPress={() => signIn()}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {loading ? <ActivityIndicator size="large" color="#52796f" /> : null}

          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate("CreateProfile")}
          >
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
