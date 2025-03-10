import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  LoadingIndicator,
  OverlayProvider,
} from "stream-chat-expo";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";

export default function DirectMessage({ route }) {
  const { hiker, client } = route.params;

  const { user } = useContext(UserContext);

  const [channel, setChannel] = useState(null);

  const currentUser = {
    ...user,
    id: user.uid,
  };

  const otherHiker = {
    ...hiker,
    id: hiker.uid,
  };

  useEffect(() => {
    async function init() {
      try {
        console.log("hiker", otherHiker.id);
        console.log("user", currentUser.id);

        const channelID = [currentUser.id, otherHiker.id].sort().join("-");

        const newChannel = client.channel("messaging", channelID, {
          name: "chat about hiking",
          members: [currentUser.id, otherHiker.id],
        });

        await newChannel.create();
        setChannel(newChannel);
        await newChannel.watch();
      } catch (error) {
        console.log("Error Setting Up the Channel", error);
      }
    }

    if (client && user) {
      init();
    }
  }, [client, otherHiker.id, currentUser]);

  if (!channel) return <LoadingIndicator />;

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Channel channel={channel}>
          <MessageList />
          <MessageInput />
        </Channel>
      </Chat>
    </OverlayProvider>
    //<Text>message</Text>
  );
}
