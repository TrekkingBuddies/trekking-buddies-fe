import React from "react";
import { Channel, Thread } from "stream-chat-expo";

import { useAppContext } from "../../contexts/AppContext";

const ThreadScreen = (props) => {
  const { channel, thread } = useAppContext();
  return (
    <Channel channel={channel} thread={thread} threadList>
      <Thread />
    </Channel>
  );
};

export default ThreadScreen;
