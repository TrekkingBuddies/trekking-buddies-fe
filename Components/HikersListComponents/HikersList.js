import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import getHikers from "../../utils/getHikers";
import HikerCard from "./HikerCard";

export default function HikersList() {
    const [hikers, setHikers] = useState([])

    useEffect(() => {
        getHikers().then((users) => {
            setHikers(users)
        })
    }, [])
    return (
        <ScrollView>
            {hikers.map((hiker) => {
                return <HikerCard hiker={hiker}/>
            })}
        </ScrollView>
    )
}