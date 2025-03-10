import axios from "axios";

export default function patchHikerById(token, uid, userData) {

if (!token) {
    console.log("no valid token");
  } else {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return axios
      .patch(
        `https://trekking-buddies.onrender.com/api/users/${uid}`, userData,
        { headers }
      )
      .then(({ data }) => {
        return data; 
      })
      .catch((err) => console.log(err, "get hiker profile error"));
  }
    
}