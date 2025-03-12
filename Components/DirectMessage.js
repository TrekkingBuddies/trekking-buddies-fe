import React, { useContext, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import {
  Channel,
  MessageInput,
  MessageList,
  useAttachmentPickerContext,
} from "stream-chat-expo";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../contexts/AppContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function DirectMessage() {
  const { channel } = useContext(AppContext);
  const { setTopInset } = useAttachmentPickerContext();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();

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
      <Stack.Screen options={{ title: "Channel Screen", headerShown: true }} />
      {channel ? (
        <Channel channel={channel} keyboardVerticalOffset={headerHeight}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Messages");
              }}
            >
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
          <MessageList />
          <MessageInput />
        </Channel>
      ) : null}
    </SafeAreaView>
  );
}
