import React, { useState } from "react";

const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const [channel, setChannel] = useState();
console.log(channel)
  return (
    <AppContext.Provider value={{ channel, setChannel }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider}