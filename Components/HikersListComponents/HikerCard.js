import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import { SvgXml } from 'react-native-svg'
import styles from "../../styles/hikerCardStyles";

export default function HikerCard({ hiker }) {
    const navigation = useNavigation();
    return (
        <View style={styles.card}>
            <View style={styles.avatar} >
                <SvgXml
                    xml={createAvatar(identicon, { seed: hiker.avatar_id }).toString()}
                    width={50}
                    height={50}
                />
            </View>
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