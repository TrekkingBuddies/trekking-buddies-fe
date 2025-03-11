import React from "react";

import { View, Text } from "react-native";

import { Channel, MessageList, MessageInput } from "stream-chat-expo";

import { useAppContext } from "../../contexts/AppContext";

const ChannelScreen = (props) => {
  const { navigation } = props;
  const { channel, setThread } = useAppContext();

  // React.useEffect(() => {
  //   console.log("Selected Channel:", channel); // Debugging channel state
  // }, [channel]);

  if (!channel) {
    return (
      <View>
        <Text>Loading Channel...</Text>
      </View>
    );
  }

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
