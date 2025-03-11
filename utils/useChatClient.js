import { useEffect, useState, useContext } from "react";
import { StreamChat } from "stream-chat";
import { UserContext } from "../contexts/UserContext";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      console.log("No user");
      // If user is not available, exit the effect and don't attempt to connect the chat client
      return;
    }

    const chatClient = StreamChat.getInstance(apiKey);

    const connectUser = async () => {
      try {
        await chatClient.connectUser(
          { id: user.uid, name: user.username },
          chatClient.devToken(user.uid)
        );
        //console.log(chatClient.devToken(user.uid));
        setClientIsReady(true);
      } catch (error) {
        console.error("Error connecting user:", error);
      }
    };

    connectUser();

    // return () => {
    //   chatClient.disconnectUser();
    // };
  }, [user]);

  return { clientIsReady };
};
