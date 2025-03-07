import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import getHikerById from '../utils/getHikerById';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';


export default function Profile (){
const [loading, setLoading] = useState(false)
const { user } = useContext(UserContext);
const [hiker, setHiker] = useState(null)
const [editing, setEditing] = useState(false)
const [username, setUsername] = useState("")
console.log("first console log", user)

useEffect((user) => {
    async function fetchUser (user) {
        console.log("user in useEffect", user)
        const uid = user.uid
        console.log("uid", uid)
        const tokenRequest = await user.getIdToken();
        
        console.log("token in profile", tokenRequest)
    
    
       const hikerResponse = await getHikerById(tokenRequest, uid)
       setHiker(hikerResponse)
       
    }

    if (!user) {
        console.log("User not available")
    } else {
        fetchUser(user) 
    }
    if (hiker) {
        console.log("in the conditon: hiker", hiker)
        setUsername(hiker.user.username)
    }
}, [user]) 

// console.log("hiker", hiker.user.email)
// console.log("username", username)



function updateProfile() {
    setEditing(false)
}

    return (
        <View>
        
        {hiker ? (  
            <><Text>Username:</Text> <TextInput editable={true} value={hiker.user} /> </> ) 
            : ( <Text>Loading Profile...</Text> )}
        
        {editing ? (
            
            <TouchableOpacity onPress={() => updateProfile()}><Text>Save</Text></TouchableOpacity>

        ) : (

            <TouchableOpacity onPress={() => setEditing(true)}><Text>Edit profile</Text></TouchableOpacity>

        )}

        </View>
        // <View>
        //     {/* <TextInput editable={editing} onChangeText={(text) => {}/> */}

        // </View>
    )
}