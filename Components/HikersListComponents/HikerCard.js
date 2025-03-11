import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import { SvgXml } from "react-native-svg";
import styles from "../../styles/hikerCardStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HikerCard({ hiker }) {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <View style={styles.user_main_container}>
        <View style={styles.avatar_username_container}>
          <View style={styles.avatar}>
            <SvgXml
              xml={createAvatar(identicon, {
                seed: hiker.avatar_id,
              }).toString()}
              width={20}
              height={20}
            />
          </View>
          <TouchableOpacity 
          onPress={()=> {navigation.navigate("HikersProfile", { hiker })}}>
          <Text style={styles.username}>{hiker.username}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.location_container}>
        <MaterialCommunityIcons name="map-marker" color={"#ccc"} size={23} />
        <Text style={styles.location}>{hiker.city || hiker.location}</Text>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>{hiker.bio || "No bio avaliable"}</Text>
      </View>
      <View style={styles.skill_distance_container}>
        <Text style={styles.skill}>Skill level: {hiker.skill_level}</Text>
        <Text style={styles.dintance}>
          Distance: {hiker.distance === 0 ? "nearby" : hiker.distance + " km"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.messageButton}
        onPress={() => navigation.navigate("DirectMessage", { hiker })}
      >
        <Text style={styles.buttonText}>Message</Text>
      </TouchableOpacity>
    </View>
  );
}
