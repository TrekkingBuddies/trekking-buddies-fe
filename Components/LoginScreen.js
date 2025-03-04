import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../configs/firebaseConfig';

//styling sheet required here? <<<<<< ------- import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LoginScreen({navigation}){
    // const [username, setUsername] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    //error handling state
    //loading handling state 
    //function to handle the login / error 

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response)
        } catch (error) {
            console.log(error)
            alert(error.message)
        } finally {
            setLoading(false);
        }
    }

    return (

        <View>
            <ImageBackground source={require('../assets/hiking.png')}></ImageBackground>
            <View> 
                <Text>Hey<Text>Buddy</Text>,</Text>
                <Text>Welcome back</Text>

                <TextInput 
                placeholder="Email"
                value={email}
                onChangeText={(email) => setEmail(email)} />
                <TextInput 
                placeholder="Password" 
                value={password}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}/>

                <TouchableOpacity onPress={()=> signIn()}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('CreateProfile')}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    background: {
        justifyContent: 'center',
        backgroundColor: '#E8F5E9',
    }})

