import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Messages from "./Messages";
import Hikers from "./Hikers";
import { StyleSheet, View } from "react-native";
import Profile from "./Profile";
import { SvgXml } from "react-native-svg";
import { identicon } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { UserContext } from "../contexts/UserContext";

const Tab = createBottomTabNavigator();

export default function Navbar() {
  const { avatar } = useContext(UserContext);
  return (
    <Tab.Navigator
      initialRouteName="Hikers"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#2f4f4f",
        tabBarStyle: styles.navbar,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIconStyle: { marginBottom: -2 },
      }}
    >
      <Tab.Screen
        name="Hikers"
        component={Hikers}
        options={{
          tabBarLabel: "Hikers",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-search-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="message-text-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
     <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => {
            return (
              <View style={[styles.avatar, { borderColor: color }]}>
                <SvgXml
                  xml={createAvatar(identicon, {
                    seed: avatar,
                  }).toString()}
                  width={21}
                  height={21}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#52796f",
    height: 70,
    paddingTop: 7,
  },
  avatar: {
    padding: 6,
    borderWidth: 1.5,
    borderRadius: 50,
    backgroundColor: "white",
    marginBottom: -11
  },
});
