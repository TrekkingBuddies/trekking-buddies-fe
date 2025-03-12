import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#52796f",
      paddingTop: 25,
      paddingHorizontal: 20,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#2980b9",
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      height: 100,
    },
    headerText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },
    logo: {
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
    },
    button: {
      backgroundColor: "#2f4f4f",
      padding: 8,
      borderRadius: 5,
      width: "20%",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 15,
      color: "white",
    },
});

export default styles