import React from "react";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import { Text } from "react-native-svg";

export default function DirectMessage() {
  const { channel } = useContext(AppContext);

  if (!channel) {
    return <Text>Loading or error, no channel found</Text>;
  }

  return (
    <Channel channel={channel} keyboardVerticalOffset={0}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}
