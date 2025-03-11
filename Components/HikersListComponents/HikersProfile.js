import { useRoute } from "@react-navigation/native"
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

import styles from "../../styles/hikersProfileStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function HikersProfile() {
    const route = useRoute()
    const { hiker } = route.params
    const navigation = useNavigation();

    console.log(Array.isArray(hiker.preferences))
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
                    <Text style={styles.username}>{hiker.username}</Text>
                </View>
                <View style={styles.location_container}>
                    <MaterialCommunityIcons name="map-marker" color={"#ccc"} size={23} />
                    <Text style={styles.location}>{hiker.city || hiker.location}</Text>
                </View>
            </View>
            <View style={styles.skill_distance_container}>
                <Text style={styles.skill}>Skill level: {hiker.skill_level}</Text>
                <Text style={styles.dintance}>
                    Distance: {hiker.distance === 0 ? "nearby" : hiker.distance + " km"}
                </Text>
            </View>
            {hiker.preferences && hiker.preferences.length > 0 && (
                <View style={styles.preferenceContainer}>
                    {hiker.preferences.map((preference, index) => (
                        <View key={index} style={styles.preferenceIcon}>
                            <Text style={styles.preferenceText}>{preference}</Text>
                        </View>
                    ))}
                </View>
            )}
            <View style={styles.bioContainer}>
                <Text style={styles.bioText}>{hiker.bio || "No bio avaliable"}</Text>
            </View>
            <View style={styles.spacer} />
            <TouchableOpacity
                style={styles.messageButton}
                onPress={() => navigation.navigate("DirectMessage", { hiker })}
            >
                <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
        </View>
    )
}

