import React from "react";

import { ChannelList } from "stream-chat-expo"; // stream-chat-react-native Or stream-chat-expo
import { useAppContext } from "../../contexts/AppContext";

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

export default ChannelListScreen;
