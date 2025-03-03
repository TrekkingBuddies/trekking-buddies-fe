import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import {CreateProfile, DirectMessage, HikersList, Messages, Profile} from "./PagesCollection"
import LoginScreen from './Components/LoginScreen';
import CreateProfile from './Components/CreateProfile';
import DirectMessage from './Components/DirectMessage';
import HikersList from './Components/HikersList';
import Messages from './Components/Messages';
import Profile from './Components/Profile';


const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="CreateProfile" component={CreateProfile}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="HikersList" component={HikersList}/>
        <Stack.Screen name="Messages" component={Messages}/>
        <Stack.Screen name="DirectMessage" component={DirectMessage}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
