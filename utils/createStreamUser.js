export default async function createStreamUser(user) {
  const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;
  try {
    const response = await fetch(
      `https://chat.eu-west-1.stream-io-api.com/api/v1.0/users/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.uid,
          name: user.username,
        }),
      }
    );

    if (response.ok) {
      console.log("User created successfully");
    } else {
      console.error(
        "Failed to create user:",
        response.status,
        await response.text()
      );
    }
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
