import axios from "axios";

export default function getHikerById(token, uid) {

if (!token) {
    console.log("no valid token");
  } else {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return axios
      .get(
        `https://trekking-buddies.onrender.com/api/users/${uid}`,
        { headers }
      )
      .then(({ data }) => {
        return data; 
      })
      .catch((err) => console.log(err, "get hiker profile error"));
  }
    
}