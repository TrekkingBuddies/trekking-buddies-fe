import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Messages from "./Messages";
import ChatContextProvider from "../contexts/ChatContext";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <ChatContextProvider>
      <Stack.Navigator>
        <Stack.Screen name="Messages" component={Messages} />
      </Stack.Navigator>
    </ChatContextProvider>
  );
};

// currently not used
