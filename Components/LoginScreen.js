import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../configs/firebaseConfig';
import { Platform } from 'react-native';

import styles from '../styles/loginScreenStyle';

//styling sheet required here? <<<<<< ------- import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LoginScreen({navigation}){
    // const [username, setUsername] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const user = response.user; 
            console.log(user)
            const uid = user.uid;
        } catch (error) {
            console.log(error)
            alert(error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/hiking.png')}
                style={styles.backgroundImage}
            >
                <KeyboardAvoidingView style={styles.content}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Text style={styles.header}>
                        Hey<Text style={styles.buddy}> Buddy</Text>,
                    </Text>
                    <Text style={styles.subheader}>Welcome back</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />

                    <TouchableOpacity style={styles.button} onPress={() => signIn()}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <Text style={styles.signupText}>Don't have an account?</Text>
                    <TouchableOpacity
                        style={styles.signupButton}
                        onPress={() => navigation.navigate('CreateProfile')}
                    >
                        <Text style={styles.signupButtonText}>Sign up</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
}