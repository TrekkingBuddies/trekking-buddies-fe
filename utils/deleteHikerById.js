import axios from "axios";

export default function deleteHikerById(token, uid) {

if (!token) {
    console.log("no valid token");
  } else {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return axios
      .delete(
        `https://trekking-buddies.onrender.com/api/users/${uid}`,
        { headers }
      )
      .then(({ data }) => {
        return data; 
      })
      .catch((err) => console.log(err, "delete profile error"));
  }
    
}