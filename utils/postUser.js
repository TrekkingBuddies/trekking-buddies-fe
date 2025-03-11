import axios from "axios";
export default function postUser(userData, headers) {
    axios
    .post("https://trekking-buddies.onrender.com/api/users", userData, {
        headers
    })
    .then((response) => {
        alert("Signed up!");
    })
    .catch((error) => {
        alert("Post request failed to sign up");
        console.log("error in axios post", error);
    });

    // TO SEND FROM FRONT-END DIRECTLY, NOT NEEDED UNLESS BACK-END BREAKS.
            // await setDoc(doc(db, 'users', uid), {
            //     bio: bio,
            //     location: location,
            //     email: email,
            //     skill_level: skillLevel
            // });
}