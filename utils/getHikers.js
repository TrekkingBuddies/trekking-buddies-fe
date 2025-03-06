import axios from "axios";
export default function getHikers(token, page = 1, limit = 3) {
  if (!token) {
    console.log("no valid token");
  } else {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return axios
      .get(
        `https://trekking-buddies.onrender.com/api/users?p=${page}&limit=${limit}`,
        { headers }
      )
      .then(({ data }) => {
        return data; // Return the entire data object
      })
      .catch((err) => console.log(err, "get hikers error"));
  }
}
