import { useEffect, useState, useContext } from "react";
import { StreamChat } from "stream-chat";
import { UserContext } from "../contexts/UserContext";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;

const chatClient = StreamChat.getInstance(apiKey);

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);

  const { user } = useContext(UserContext);

  const currentUser = {
    id: user.uid,
    name: user.username,
  };

  useEffect(() => {
    const setupClient = async () => {
      try {
        chatClient.connectUser(
          currentUser,
          client.devToken(currentUser.id),
          setClientIsReady(true)
        );
        setClientIsReady(true);
      } catch (error) {
        if (error instanceof Error) {
          console.error();
        }
      }
    };
  });
};
