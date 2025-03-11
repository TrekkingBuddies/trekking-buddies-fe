import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ChannelListScreen } from "./ChannelListScreen";
import { useAppContext } from "../../contexts/AppContext";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

export const MessagesTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Conversations"
      screenOptions={{
        tabBarActiveTintColor: "#2f4f4f",
        tabBarInactiveTintColor: "white",
        tabBarStyle: { backgroundColor: "#52796f", height: 70, paddingTop: 7 },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIconStyle: { marginBottom: -3 },
      }}
    >
      <Tab.Screen
        name="Conversations"
        component={ChannelListScreen}
        options={{
          tabBarLabel: "Channels",
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
};
