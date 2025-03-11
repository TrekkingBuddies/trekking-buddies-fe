import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      // alignItems: "center",
      padding: 20,
      backgroundColor: "#cad2c5",
      minHeight: "100%",
    },
    contentContainer: {
      alignItems: "center",
    },
    avatarContainer: {
      // width: screenWidth / 3,
      padding: 10,
      paddingTop: 0,
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#cad2c5",
      // minHeight: "100%",
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    input: {
      width: "80%",
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    input_bio: {
      width: "80%",
      height: 80,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    inputEditable: {
      backgroundColor: "white",
      borderColor: "grey",
    },
    inputNonEditable: {
      backgroundColor: "#e0e0e0",
      borderColor: "#bdbdbd",
      color: "#757575",
      borderWidth: 1,
      borderRadius: 5,
    },
    button: {
      backgroundColor: "#52796f",
      padding: 10,
      borderRadius: 5,
      alignSelf: "center",
      marginTop: 20,
    },
    editButton: {
      backgroundColor: "#52796f",
      padding: 10,
      borderRadius: 5,
      alignSelf: "center",
      marginTop: 25,
    },
    deleteButton: {
      // backgroundColor: "#52796f",
      padding: 8,
      borderRadius: 5,
      alignSelf: "center",
      marginTop: 15,
      backgroundColor: "red",
    },
    buttonText: {
      fontSize: 15,
      color: "white",
    },
    dropdown: {
      width: "80%",
      alignSelf: "center",
      borderColor: "gray",
      backgroundColor: "white",
    },
    dropdowntext: {
      color: "grey",
    },
    avatarIcon: {
      padding: 12,
      margin: 5,
      borderWidth: 3,
      borderColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      backgroundColor: "white",
    },
    selected: {
      borderColor: "grey",
    },
    saveButton: {
      backgroundColor: "#52796f",
      padding: 10,
      borderRadius: 5,
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 50,
      width: "20%",
      alignItems: "center"
    },
});

export default styles