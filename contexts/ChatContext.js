import React, { createContext, useContext } from "react";
import { StreamChat } from "stream-chat";

const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const value = {};
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext);

export default ChatContextProvider;
