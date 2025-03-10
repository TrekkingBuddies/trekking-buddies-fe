import axios from "axios";
export default function getHikers(token, page = 1, limit = 3, filters) {
  if (!token) {
    console.log("no valid token");
  } else {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    let query = `https://trekking-buddies.onrender.com/api/users?p=${page}&limit=${limit}`;

    if (filters) {
      if (filters.skill_level && filters.skill_level !== "All") {
        query += `&skill_level=${filters.skill_level.toLowerCase()}`;
      }
      if (filters.preferences && filters.preferences.length > 0) {
        const encodedPreferences = filters.preferences.map((preference) =>
          encodeURIComponent(preference)
        );
        query += `&preferences=${encodedPreferences.join(",")}`;
      }
      if (filters.distance && filters.distance !== "All") {
        query += `&distance=${filters.distance}`;
      }
    }
    console.log(query)
    return axios
      .get(query, { headers })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => console.log(err, "get hikers error"));
  }
}
