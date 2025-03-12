import { View, Text } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import client from "../configs/streamChatClient";
import { ChannelList, Chat, OverlayProvider } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../contexts/AppContext";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export default function Messages() {
  const { user } = useContext(UserContext);
  const { setChannel } = useContext(AppContext);
  const navigation = useNavigation();

  const filters = {
    members: { $in: [user?.uid] },
  };
  const sort = { last_message_at: -1 };
  const options = { state: true, watch: true };

  const memoizedFilters = useMemo(() => filters, []);
  return (
    <View style={styles.container}>
      <ChannelList
        filters={memoizedFilters}
        options={options}
        sort={sort}
        onSelect={(channel) => {
          setChannel(channel);
          navigation.navigate("DirectMessage");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
