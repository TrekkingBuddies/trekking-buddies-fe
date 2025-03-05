import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import {CreateProfile, DirectMessage, HikersList, Messages, Profile} from "./PagesCollection"
import LoginScreen from './Components/LoginScreen';
import CreateProfile from './Components/CreateProfile';
import DirectMessage from './Components/DirectMessage';
import Hikers from './Components/Hikers';
import Messages from './Components/Messages';
import Profile from './Components/Profile';
import { auth } from './configs/firebaseConfig';
import HikersList from './Components/HikersListComponents/HikersList';
import { useEffect, useStatem, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './Components/Header';
import { UserContext, UserProvider } from './contexts/UserContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}

const MainApp = () => {
  const { user } = useContext(UserContext); // Destructure the user context
  console.log("User in app", user)
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => <Header />,
        }}>
        {user ? (
          <>
            <Stack.Screen name="Hikers" component={Hikers} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Messages" component={Messages} />
            <Stack.Screen name="DirectMessage" component={DirectMessage} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreateProfile" component={CreateProfile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};



const styles = StyleSheet.create({
  navigationContainer: {
      flex: 1,
      backgroundColor: '#f9f9f9', // Very light background for the whole navigation
  },
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
});
