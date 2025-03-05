import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { app, auth } from '../configs/firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';

export default function Header() {

const handleSignOut = async () => {
    try {
          await signOut(auth);
    } catch (error) {
          console.error('Sign-out error:', error);
    }
};

  return (
    <View style={styles.header}>
      <Text></Text>
      <Button title="Sign Out" color="white" onPress={handleSignOut} /> 
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#52796f', 
      paddingTop: 40,
      paddingVertical: 15,
      paddingHorizontal: 20,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#2980b9', 
      elevation: 4, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      height: 100
    },
    headerText: {
      color: 'white', 
      fontSize: 20,
      fontWeight: 'bold',
    },
  });