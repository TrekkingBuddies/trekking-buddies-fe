import { StyleSheet } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./Components/LoginScreen";
import CreateProfile from "./Components/CreateProfile";
import DirectMessage from "./Components/DirectMessage";
import Profile from "./Components/Profile";
import { useContext, useEffect, useState } from "react";
import Header from "./Components/Header";
import { UserContext, UserProvider } from "./contexts/UserContext";
import Navbar from "./Components/Navbar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Chat,
  ChannelList,
  OverlayProvider,
  Channel,
  MessageList,
  MessageInput,
  Thread,
} from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { View, Text } from "react-native";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import ChannelListScreen from "./Components/MessagesComponents/ChannelListScreen";
import ChannelScreen from "./Components/MessagesComponents/ChannelScreen";
import ThreadScreen from "./Components/MessagesComponents/ThreadScreen";
import { MessagesTab } from "./Components/MessagesComponents/MessagesTab";
import { useChatClient } from "./utils/useChatClient";
import { ChatWrapper } from "./Components/MessagesComponents/ChatWrapper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;
// const chatClient = StreamChat.getInstance(apiKey);

export default function App() {
  return (
    <UserProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </UserProvider>
  );
}

const MainApp = () => {
  const { user } = useContext(UserContext); // Destructure the user context
  // const { clientIsReady } = useChatClient();

  const NavigationStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: () => <Header />,
          }}
        >
          {user ? (
            <>
              <Stack.Screen name="Main" component={Navbar} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="DirectMessage" component={DirectMessage} />
              <Stack.Screen name="MessagesTab" component={MessagesTab} />
              <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
              <Stack.Screen name="ThreadScreen" component={ThreadScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <ChatWrapper>
          <NavigationStack />
        </ChatWrapper>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#52796f",
    height: 70,
    paddingTop: 7,
  },
});
