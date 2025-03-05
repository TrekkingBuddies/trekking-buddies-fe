import React, { useEffect, useState } from "react";
import getHikers from "../../utils/getHikers";
import HikerCard from "./HikerCard";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function HikersList() {
    const [hikers, setHikers] = useState([])

    useEffect(() => {
        getHikers().then((users) => {
            setHikers(users)
        })
    }, [])
    return (
        <View style={Style.container}>
         <FlatList 
            data={hikers} //exact array of hikers
            keyExtractor={(item)=> item.id.toString()} //unique key for each item
            renderItem={({item}) => <HikerCard hiker={item}/>} //pass each hiker to hiker card
         />
        </View>
        
    )
}