import React from "react";

import { Channel, MessageList, MessageInput } from "stream-chat-expo";

import { useAppContext } from "../../contexts/AppContext";

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

export default ChannelScreen;
