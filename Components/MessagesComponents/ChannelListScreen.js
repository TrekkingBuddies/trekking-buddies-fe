import React from "react";

import { ChannelList } from "stream-chat-expo";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useAppContext } from "../../contexts/AppContext";

export const ChannelListScreen = (props) => {
  const { user } = useContext(UserContext);
  const { setChannel } = useAppContext();

  const onChannelSelect = (channel) => {
    setChannel(channel);
    //console.log("Channel selected (CLS):", channel);
    const { navigation } = props;
    navigation.navigate("ChannelScreen");
  };

  return (
    <ChannelList
      onSelect={onChannelSelect}
      filters={{ members: { $in: [user?.uid] } }}
      sort={{ last_message_at: -1 }}
    />
  );
};
