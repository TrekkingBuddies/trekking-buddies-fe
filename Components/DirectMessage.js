import React, { useEffect, useState, useContext } from "react";

import { StreamChat } from "stream-chat";

import {
  Chat,
  Channel,
  Window,
  ChannelListHeaderErrorIndicator,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
} from "stream-chat-expo";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;
const testUser = {
  id: "jlahey",
  name: "Jim Lahey",
  image: "https://i.imgur.com/fR9Jz14.png",
};

export default function DirectMessage({ hiker }) {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apiKey);
      await chatClient.connectUser(testUser, client.devToken(testUser.id));
      const channel = chatClient.channel("messaging", hiker.username, {
        name: "talk about hiking",
        members: [user.id, hiker.username],
      });

      await channel.watch();

      setChannel(channel);
      setClient(chatClient);
    }

    init();
  }, []);

  if (!channel || !client) return <LoadingIndicator />;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
}
