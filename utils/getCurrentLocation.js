import * as Location from "expo-location";

export default async function getCurrentLocation(city) {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access location was denied");
    return;
  }

  if (city) {
    try {
      let coordsFromAddress = await Location.geocodeAsync(city);
      return {
        latitude: coordsFromAddress[0].latitude,
        longitude: coordsFromAddress[0].longitude,
      };
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
