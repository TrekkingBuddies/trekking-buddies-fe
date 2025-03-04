import { View, Text, TouchableOpacity } from "react-native";


export default function HikerCard({hiker}) {
    return (
        <View>
            <Text>Avatar placeholder{hiker.avatar_id}</Text>
            <Text>Username: {hiker.username}</Text>
            <Text>Location: {hiker.location}</Text>
            <Text>Skill: {hiker.skill_level}</Text>
            <TouchableOpacity>Message</TouchableOpacity>
        </View>
    )
}