import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

//styling sheet required here? <<<<<< ------- import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


export default function LoginScreen({navigation}){
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    //error handling state
    //loading handling state 
    //function to handle the login / error 


    return (

        <View>
            <ImageBackground></ImageBackground>
            <View> 
                <Text>Hey<Text>Buddy</Text>,</Text>
                <Text>Welcome back</Text>

                <TextInput placeholder="Username" />
                <TextInput placeholder="Password" />

                <TouchableOpacity onPress={()=> navigation.navigate('HikersList')}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('Createprofile')}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}