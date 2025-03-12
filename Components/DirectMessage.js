import React, { useContext, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import {
  Channel,
  MessageInput,
  MessageList,
  useAttachmentPickerContext,
} from "stream-chat-expo";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../contexts/AppContext";

export default function DirectMessage() {
  const { channel } = useContext(AppContext);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: channel.data.name });
  }, [navigation]);

  if (!channel) {
    return (
      <SafeAreaView>
        <Text>Loading chat ...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {channel ? (
        <Channel channel={channel} keyboardVerticalOffset={0}>
          <MessageList />
          <MessageInput />
        </Channel>
      ) : null}
    </SafeAreaView>
  );
}
