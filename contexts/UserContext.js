import { View, Text } from "react-native";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../configs/firebaseConfig";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("Hiker1");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
          setUser(authUser);
          setLoading(false) 
        })
        return () => unsubscribe();
      }, [])

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <UserContext.Provider value={{ user, setUser, avatar, setAvatar }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
