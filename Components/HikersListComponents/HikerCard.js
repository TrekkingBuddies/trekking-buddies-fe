import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HikerCard({ hiker }) {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <Text style={styles.avatar}>Avatar placeholder{hiker.avatar_id}</Text>
      <Text style={styles.username}>Username: {hiker.username}</Text>
      <Text style={styles.location}>{hiker.location}</Text>
      <View style={styles.bioContainer}>
      <Text style={styles.bioText}>{hiker.bio || "No bio avaliable"}</Text>
      </View>
      <Text style={styles.skill}>Skill: {hiker.skill_level}</Text>
      <TouchableOpacity
        style={styles.messageButton}
        onPress={() => navigation.navigate("DirectMessage", { hiker })}
      >
        <Text style={styles.buttonText}>Message</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: "#fff",
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 15,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4, 
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    avatar: {
      fontSize: 24, 
      marginRight: 10,
    },
    username: {
      fontSize: 18,
      fontWeight: "bold",
    },
    location: {
        fontSize: 14,
        color: "#333",
        marginBottom: 10,
    },
    bioContainer: {
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10, 
    },
    bioText: {
       fontSize: 14,
       color: "#333",
    },
    skill: {
      fontSize: 14,
      color: "#333",
      marginBottom: 10,
    },
    messageButton: {
      backgroundColor: "#52796f",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
    },
  });