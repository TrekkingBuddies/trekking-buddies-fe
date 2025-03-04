import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../configs/firebaseConfig';
import { Platform } from 'react-native';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
        padding: 20,
        borderRadius: 10,
        margin: 20,
        
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buddy:{
        color: '#52796f'
    },
    subheader: {
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#52796f',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        color: "white",
    },
    signupText: {
        textAlign: 'center',
        marginTop: 10,
    },
    signupButton: {
        alignItems: 'center',
        marginTop: 5,
        paddingBottom: 15
    },
    signupButtonText: {
        color: '#52796f',
    },
});

