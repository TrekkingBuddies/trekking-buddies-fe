import { StyleSheet } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Components/LoginScreen";
import CreateProfile from "./Components/CreateProfile";
import DirectMessage from "./Components/DirectMessage";
import HikersProfile from "./Components/HikersListComponents/HikersProfile";
import Profile from "./Components/Profile";
import { useContext } from "react";
import Header from "./Components/Header";
import { UserContext, UserProvider } from "./contexts/UserContext";
import Navbar from "./Components/Navbar";
import { ChannelList, Chat, OverlayProvider } from "stream-chat-expo";
import client from "./configs/streamChatClient";
import { MenuProvider } from "react-native-popup-menu";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "./contexts/AppContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OverlayProvider>
        <Chat client={client}>
          <MenuProvider>
            <UserProvider>
              <AppProvider>
                <MainApp />
              </AppProvider>
            </UserProvider>
          </MenuProvider>
        </Chat>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
}

const MainApp = () => {
  const { user } = useContext(UserContext);
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
            <Stack.Screen name="HikersProfile" component={HikersProfile} />
            <Stack.Screen name="DirectMessage" component={DirectMessage} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateProfile"
              component={CreateProfile}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
