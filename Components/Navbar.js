import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Hikers from "./Hikers";
import { StyleSheet } from "react-native";
import { MessagesTab } from "./MessagesComponents/MessagesTab";

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    <Tab.Navigator
      initialRouteName="Hikers"
      screenOptions={{
        tabBarActiveTintColor: "#2f4f4f",
        tabBarInactiveTintColor: "white",
        tabBarStyle: styles.navbar,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIconStyle: { marginBottom: -3 },
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
        component={MessagesTab}
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
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#52796f",
    height: 70,
    paddingTop: 7,
  },
});
