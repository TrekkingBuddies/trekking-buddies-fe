import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
        backgroundColor: "#cad2c5",
        minHeight: "100%",
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
    button: {
        backgroundColor: "#52796f",
        padding: 10,
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        color: "white",
    },
    dropdown: {
        width: "80%",
        alignSelf: "center",
        borderColor: "gray",
        backgroundColor: "none",
    },
    dropdowntext: {
        color: "grey",
    },
    avatarContainer: {
        width: "100%", // Ensure it takes full width
        alignItems: "center",
    },
    avatarIcon: {
        padding: 10,
        margin: 5,
        borderWidth: 3,
        borderColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "white",
        width: 70,
        height: 70,
    },
    selected: {
        borderColor: "grey",
    },
    checkbox:{
        flex:0
    }
});

export default styles