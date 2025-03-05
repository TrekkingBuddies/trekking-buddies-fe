import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HikerCard({hiker}) {
    const navigation = useNavigation()
    return (
        <View>
            <Text>Avatar placeholder{hiker.avatar_id}</Text>
            <Text>Username: {hiker.username}</Text>
            <Text>Location: {hiker.location}</Text>
            <Text>Skill: {hiker.skill_level}</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("DirectMessage", {hiker})}>Message</TouchableOpacity> 
        </View>
    )
}