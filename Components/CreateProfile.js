import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import React, { Component, useState } from 'react'
import { auth } from '../configs/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../configs/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import DropDownPicker from "react-native-dropdown-picker";

export default function CreateProfile (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [skillLevel, setSkillLevel] = useState(null);
    const [items, setItems] = useState([
    { label: "Novice", value: "novice" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Pro", value: "pro" },
    ]);
   

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user; 
            const uid = user.uid;
            console.log(response)
            
            await setDoc(doc(db, 'users', uid), {
                bio: bio,
                location: location,
                email: email,
                skill_level: skillLevel
            });
            alert("Signed up!")

        } catch (error) {
            console.log(error)
            alert(error.message)
        } finally {
            setLoading(false);
        }
    }

    
    return (
        <>
        <View style={styles.container}>
            <Text style={styles.title}>CreateProfile</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <TextInput
                style={styles.input_bio}
                placeholder="BIO"
                onChangeText={(text) => setBio(text)}
                value={bio}
            />
            <TextInput
                style={styles.input}
                placeholder="Location"
                onChangeText={(text) => setLocation(text)}
                value={location}
            />
            <DropDownPicker
                open={open}
                value={skillLevel}
                items={items}
                setOpen={setOpen}
                setValue={setSkillLevel}
                setItems={setItems}
                placeholder="Select Skill level"
                style={styles.dropdown}
                textStyle={styles.dropdowntext}
            />
            <TouchableOpacity style={styles.button} onPress={() => signUp()}>
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
        </View>
        
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#cad2c5',
        minHeight: '100%'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    input_bio: {
        width: '80%',
        height: 80,
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
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        color: 'white'
    },
    dropdown: {
        width: '80%',
        alignSelf: 'center',
        borderColor: 'gray',
        backgroundColor: 'none',
        
    },
    dropdowntext: {
        color: 'grey'
    }
});

