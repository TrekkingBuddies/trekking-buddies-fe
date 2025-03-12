import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import { SvgXml } from "react-native-svg";
import styles from "../../styles/hikerCardStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import client from "../../configs/streamChatClient";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { AppContext } from "../../contexts/AppContext";
import getHikerById from "../../utils/getHikerById";

export default function HikerCard({ hiker }) {
  const navigation = useNavigation();
  const maxBioLength = 30;
  const { setChannel } = useContext(AppContext);
  const { user } = useContext(UserContext);

  const handleCreateChat = async ({ hiker }) => {
    try {
      const uid = user.uid;
      const tokenRequest = await user.getIdToken();
      const hikerResponse = await getHikerById(tokenRequest, uid);
      const channel = client.channel("messaging", {
        members: [user.uid, hiker.uid],
        name: `${hiker.username} & ${hikerResponse?.user?.username}`,
      });

      await channel.watch();
      navigation.navigate("DirectMessage");
    } catch (err) {
      console.log(err);
    }
  };

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
            onPress={() => {
              navigation.navigate("HikersProfile", { hiker });
            }}
          >
            <Text style={styles.username}>{hiker.username}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.location_container}>
          <MaterialCommunityIcons name="map-marker" color={"#ccc"} size={23} />
          <Text style={styles.location}>{hiker.city || hiker.location}</Text>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>
          {hiker.bio
            ? hiker.bio.length > maxBioLength
              ? `${hiker.bio.substring(0, maxBioLength)}...`
              : hiker.bio
            : "No bio avaliable"}
        </Text>
      </View>
      <View style={styles.skill_distance_container}>
        <Text style={styles.skill}>Skill level: {hiker.skill_level}</Text>
        <Text style={styles.dintance}>
          Distance: {hiker.distance === 0 ? "nearby" : hiker.distance + " km"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.messageButton}
        onPress={() => handleCreateChat({ hiker })}
      >
        <Text style={styles.buttonText}>Message</Text>
      </TouchableOpacity>
    </View>
  );
}
