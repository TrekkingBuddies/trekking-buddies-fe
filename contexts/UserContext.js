import { View, Text } from 'react-native';
import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState, createContext, useContext } from 'react';
import { auth } from '../configs/firebaseConfig';
import getHikerById from '../utils/getHikerById';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState('Hiker1');
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const sendUserInfo = async () => {
      if (user && user.uid && user.accessToken) {
        setUid(user.uid);
        setToken(user.accessToken);
        const userInfoRequest = await getHikerById(token, uid);
        setUserInfo(userInfoRequest);
        if (userInfoRequest?.user?.avatar_id) {
          setAvatar(userInfoRequest.user.avatar_id);
        }
      }
    };
    if (user && user.uid && user.accessToken) {
      sendUserInfo();
    }
  }, [user, token]);

  useEffect(() => {
    if (userInfo?.user?.avatar_id) {
      setAvatar(userInfo.user.avatar_id);
      console.log('Avatar updated:', userInfo.user.avatar_id);
    }
  }, [userInfo?.user?.avatar_id]);

  const refetchUserInfo = async () => {
    if (user && user.uid && user.accessToken) {
      const updatedUserInfo = await getHikerById(token, uid);
      setUserInfo(updatedUserInfo);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, avatar, setAvatar, refetchUserInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
