import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { chatUserId } from "../configs/chatConfig";
import { useMemo, useContext } from "react";
import { ChannelList } from "stream-chat-expo";
import { AppContext } from "../contexts/AppContext";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const filters = {
  members: { $in: [chatUserId] },
  type: "messaging",
};
const sort = { last_updated: -1 };
const options = {
  state: true,
  watch: true,
};

export default function ChannelListScreen() {
  const memoizedFilters = useMemo(() => filters, []);
  const { setChannel } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Channel List Screen" }} />
      <ChannelList
        filters={memoizedFilters}
        options={options}
        sort={sort}
        onSelect={(channel) => {
          setChannel(channel);
          navigation.navigate("ChatRoom");
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
