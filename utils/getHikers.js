import axios from "axios";

export default function getHikers() {

    const apiKey = process.env.REACT_APP_API_KEY
    if(!apiKey) {
        console.log(apiKey)
        console.log("wrong key")
    }
    return axios.get("https://trekking-buddies.onrender.com/api/users", {headers: {Authorization: `Bearer ${apiKey}` }})
    .then(({data}) => {
        console.log(data)
        return data.users
    })
}