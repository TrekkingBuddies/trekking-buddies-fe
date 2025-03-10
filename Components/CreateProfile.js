import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    FlatList
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { auth } from "../configs/firebaseConfig";
import { doc, getDocs, setDoc, collection, query, where, getDoc } from "firebase/firestore";
import { db } from "../configs/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import DropDownPicker from "react-native-dropdown-picker";
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import { SvgXml } from 'react-native-svg'
import getCurrentLocation from "../utils/getCurrentLocation";
import styles from "../styles/createProfileStyles";
import postUser from "../utils/postUser";

export default function CreateProfile() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [skillLevel, setSkillLevel] = useState(null);
    const [items, setItems] = useState([
        { label: "Novice", value: "novice" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Pro", value: "pro" },
    ]);
    const [selectedAvatar, setSelectedAvatar] = useState(null)
    const avatarIcons = [{ id: "1", seed: "Hiker1" }, { id: "2", seed: "Hiker2" }, { id: "3", seed: "Hiker3" }, { id: "4", seed: "Hiker4" }, { id: "5", seed: "Hiker5" }, { id: "6", seed: "Hiker6" }]


    const signUp = async () => {
        if(!username){
            alert("Please enter a username")
            return
        }
        setLoading(true);

        const latLong = await getCurrentLocation(city);
        try {

            // const usernameDoc = doc(db, "usernames", username);  
            // const usernameSnapshot = await getDoc(usernameDoc);

            // if (usernameSnapshot.exists()) {
            //     alert("Username already taken. Please choose another one.");
            //     setLoading(false);
            //     return;
            // }

            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = response.user;
            const uid = user.uid;
            const token = await user.getIdToken();
            console.log("token in create profile", token);

            const headers = {
                "Content-Type": "application/json",
                Authorization: token,
            };

            const userData = {
                avatar_id: selectedAvatar,
                username: username,
                bio: bio,
                location: city,
                email: email,
                skill_level: skillLevel,
                latLong: latLong
            };

            // await setDoc(usernameDoc, {uid})
            // const userDoc = doc(db, "users", uid);
            // await setDoc(userDoc, userData);
    
            await postUser(userData, headers)
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>CreateProfile</Text>

                <View style={styles.container}>
                    <FlatList
                        data={avatarIcons}
                        numColumns={3}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => setSelectedAvatar(item.seed)}
                            >
                                <View style={[styles.avatarIcon, selectedAvatar === item.seed && styles.selected]} >
                                    <SvgXml
                                        xml={createAvatar(identicon, { seed: item.seed }).toString()}
                                        width={50}
                                        height={50}
                                    />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />

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
                    onChangeText={(text) => setCity(text)}
                    value={city}
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
    );
}