import { View, Text } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import client from "../configs/streamChatClient";
import { ChannelList, Chat, OverlayProvider } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../contexts/AppContext";

export default function Messages() {
  const { user } = useContext(UserContext);
  const { channel, setChannel } = useContext(AppContext);
  const navigation = useNavigation();

  const filters = {
    members: { $in: [user?.uid] },
  };
  const sort = { last_message_at: -1 };
  const options = { state: true, watch: true };
  return (
    <ChannelList
      filters={filters}
      sort={sort}
      options={options}
      onSelect={() => {
        setChannel(channel);
        navigation.navigate("DirectMessage");
      }}
    />
  );
}
