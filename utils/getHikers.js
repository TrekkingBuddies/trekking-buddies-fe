import axios from "axios";

import { UserContext, UserProvider } from './contexts/UserContext';
import { useContext } from 'react';

export default function getHikers() {
    const { user } = useContext(UserContext)
    

    const apiKey = process.env.REACT_APP_API_KEY
    if(!apiKey) {
        console.log(apiKey)
        console.log(user)
    } else {
        return axios.get("https://trekking-buddies.onrender.com/api/users", {headers: {Authorization: `Bearer ${apiKey}` }})
        .then(({data}) => {
            console.log(data)
            return data.users
        })
    }
}

//     return {users:[{
//         avatar_id: 3,
//         username: "harry5",
//         location: "Manchester",
//         skill_level: "Professional"
//     },{
//         avatar_id: 4,
//         username: "pinktea",
//         location: "London",
//         skill_level: "Beginner"
//     },{
//         avatar_id: 9,
//         username: "redblue",
//         location: "Salford",
//         skill_level: "Beginner"
//     }]}
// }