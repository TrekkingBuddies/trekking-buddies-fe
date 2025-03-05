import axios from "axios";
export default function getHikers(token) {
  console.log(token);
  if (!token) {
    console.log("no valid token");
  } else {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return axios
      .get("https://trekking-buddies.onrender.com/api/users", { headers })
      .then(({ data }) => {
        return data.users;
      })
      .catch((err) => console.log(err, "get hikers error"));
  }
}