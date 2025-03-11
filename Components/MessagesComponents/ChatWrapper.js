import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateChatClient } from "stream-chat-expo";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useChatClient } from "../../utils/useChatClient";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { StreamChat } from "stream-chat";

//const { user } = useContext(UserContext);

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;

// const currentUser = {
//   id: user.uid,
//   name: user.username,
// };

export const ChatWrapper = ({ children }) => {
  //   const chatClient = useCreateChatClient({
  //     apiKey: apiKey,
  //     userData: currentUser,
  //     //tokenOrProvider: chatUserToken,
  //   });

  const { clientIsReady } = useChatClient();

  if (!clientIsReady) {
    return (
      <SafeAreaView>
        <Text>Loading chat ...</Text>
      </SafeAreaView>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={StreamChat.getInstance(apiKey)}>{children}</Chat>
    </OverlayProvider>
  );
};
