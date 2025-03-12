import React from 'react';
import { Channel, MessageInput, MessageList } from 'stream-chat-expo';

export default function DirectMessage({ route }) {
  const { channel } = route.params;

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