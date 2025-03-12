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
  const { setTopInset } = useAttachmentPickerContext();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();

  useEffect(() => {
    setTopInset(headerHeight);
  }, [headerHeight, setTopInset]);

  useEffect(() => {
    navigation.setOptions({ title: "Channel Screen" });
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
        <Channel channel={channel} keyboardVerticalOffset={headerHeight}>
          <MessageList />
          <MessageInput />
        </Channel>
      ) : null}
    </SafeAreaView>
  );
}
