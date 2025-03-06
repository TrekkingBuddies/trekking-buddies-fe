import { View, Text } from 'react-native'
import React from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState, createContext, useContext} from 'react';
import { auth } from '../configs/firebaseConfig';

const UserContext = createContext(null);


const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
          // const userToken = await user.getIdToken()
          // console.log("USER TOKEN ---------->", await user.getIdToken())
          // console.log("response in UserContext", authUser)
          setUser(authUser);
          setLoading(false) 
        })
        return () => unsubscribe();
      }, [])

      if (loading) {
        return <Text>Loading...</Text>;
      } 

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}

