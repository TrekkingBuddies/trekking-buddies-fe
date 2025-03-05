import axios from "axios";
export default function getHikers(token) {

    if (!token) {
        console.log("no valid token")
    } else {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        return axios.get("https://trekking-buddies.onrender.com/api/users", { headers })
            // .then(({ data }) => {
            //     console.log(data, "<<<<data")
            //     return data.users
            // })
            // .catch((err)=>
            // console.log(err, "get hikers error"))
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
