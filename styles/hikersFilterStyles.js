import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      alignItems: "center",
      gap: 4
    },
    menu_container: {flexDirection: "row", gap: 40},
    menu: {
      alignItems: "center",
      height: 30,
      justifyContent: "center",
    },
    selectedOption: {
      borderWidth: 0.75,
      borderColor: "#c7c5c5",
      backgroundColor: "#f1f1f1",
    },
    selectedText: {
      fontWeight: "bold",
      color: "#52796f",
    },
});

export default styles