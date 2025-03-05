import React, { useEffect, useState } from "react";
import getHikers from "../../utils/getHikers";
import HikerCard from "./HikerCard";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { UserContext, UserProvider } from '../../contexts/UserContext';
import { useContext } from 'react';

export default function HikersList() {
    const [hikers, setHikers] = useState([])
    const { user } = useContext(UserContext)
    const token = user.getIdToken()
console.log("in hikers list")
    useEffect(() => {
        console.log("in user effect")
        getHikers(token).then((users) => {
            console.log(users, "<<<<<<<users")
            setHikers(users)
        })
        .catch((err)=>
        console.log(err, "error"))
    }, [])

    return (
        <View >
            <FlatList
                data={hikers} //exact array of hikers
                keyExtractor={(item) => item.id.toString()} //unique key for each item
                renderItem={({ item }) => <HikerCard hiker={item} />} //pass each hiker to hiker card
            />
        </View>

    )
}