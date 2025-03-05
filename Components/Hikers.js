import React from 'react'
import {ScrollView, Text, View} from 'react-native';
import HikersList from './HikersListComponents/HikersList';

export default function Hikers (){
return (
    <View>
        <Text>The filter bar goes here</Text>
        <HikersList />
    </View>
)

}