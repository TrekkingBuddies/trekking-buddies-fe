import { StyleSheet } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import { useChatClient } from "./utils/useChatClient";

const Stack = createNativeStackNavigator();

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;

const chatClient = StreamChat.getInstance(apiKey);

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}

const MainApp = () => {
  const { user } = useContext(UserContext); // Destructure the user context
  //console.log("User in app", user);
  if (user) {
    const currentUser = {
      id: user.uid,
      name: user.username,
    };

    const filters = {
      members: {
        $in: [currentUser.name],
      },
    };

    const sort = {
      last_message_at: -1,
    };
  }

  const ChannelListScreen = (props) => {
    const { setChannel } = useAppContext();
    return (
      <ChannelList
        onSelect={(channel) => {
          const { navigation } = props;
          setChannel(channel);
          navigation.navigate("ChannelScreen");
        }}
        filters={filters}
        sort={sort}
      />
    );
  };

  const ChannelScreen = (props) => {
    const { navigation } = props;
    const { channel, setThread } = useAppContext();

    return (
      <Channel channel={channel}>
        <MessageList
          onThreadSelect={(message) => {
            if (channel?.id) {
              setThread(message);
              navigation.navigate("ThreadScreen");
            }
          }}
        />
        <MessageInput />
      </Channel>
    );
  };

  const ThreadScreen = (props) => {
    const { channel, thread } = useAppContext();
    return (
      <Channel channel={channel} thread={thread} threadList>
        <Thread />
      </Channel>
    );
  };

  const NavigationStack = () => {
    const { clientIsReady } = useChatClient();

    if (!clientIsReady) {
      return <Text>Loading chat ...</Text>;
    }
  };

  // const [clientIsReady, setClientIsReady] = useState(false);

  // useEffect(() => {
  //   async function connectUser() {
  //     //console.log(currentUser);

  //     if (user) {
  //       try {
  //         await client.connectUser(
  //           currentUser,
  //           client.devToken(currentUser.id),
  //           setClientIsReady(true)
  //         );
  //       } catch (error) {
  //         console.log("Error connecting user", error);
  //       }
  //     }
  //   }
  //   connectUser();
  // }, [user]);

  // const { clientIsReady } = useChatClient();
  // if (!clientIsReady) {
  //   return <Text>Loading Chat...</Text>;
  // }

  return (
    <NavigationContainer>
      <OverlayProvider>
        <Chat client={chatClient}>
          <Stack.Navigator
            screenOptions={{
              header: () => <Header />,
            }}
          >
            {user ? (
              <>
                <Stack.Screen name="Main" component={Navbar} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen
                  name="DirectMessage"
                  component={DirectMessage}
                  initialParams={{ chatClient }}
                />
                <Stack.Screen
                  name="ChannelList"
                  component={ChannelListScreen}
                />
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
                <Stack.Screen name="CreateProfile" component={CreateProfile} />
              </>
            )}
          </Stack.Navigator>
        </Chat>
      </OverlayProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9", // Very light background for the whole navigation
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
