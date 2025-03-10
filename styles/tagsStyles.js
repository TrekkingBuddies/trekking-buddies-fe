import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    tagContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 6,
    },
    tagWrapper: {
      flexDirection: "row",
      marginRight: 3,
      marginBottom: 5,
    },
    tag: {
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    unselectedTag: {
      backgroundColor: "#ccc",
    },
    selectedTag: {
      backgroundColor: "#CAD2C5",
    },
    tagText: {
      color: "black",
      fontWeight: "bold",
      fontSize: 14,
    },
});

export default styles