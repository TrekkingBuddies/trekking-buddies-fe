import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    avatar: {
        padding: 5,
        borderWidth: 1.5,
        borderRadius: 50,
        borderColor: "#ccc",
    },
    username: {
        fontSize: 17.5,
        fontWeight: "bold",
    },
    location: {
        fontSize: 14,
        color: "#333",
    },
    bioContainer: {
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 8,
        minHeight: 300,
        marginBottom: 15,
    },
    bioText: {
        fontSize: 14,
        color: "#333",
    },
    skill: {
        fontSize: 14,
        color: "#333",
    },
    messageButton: {
        backgroundColor: "#52796f",
        padding: 7,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 15,
    },
    dintance: {
        color: "#bebebe",
        fontSize: 14,
        fontWeight: "bold",
    },
    user_main_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 10,
        marginTop: -5,
    },
    avatar_username_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 7,
    },
    skill_distance_container: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
        marginBottom: 13,
    },
    location_container: {
        flexDirection: "row", alignItems: "center"
    },
    preferenceContainer: {
        marginBottom: 10,
        marginBottom: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    },
    preferenceIcon: {
        backgroundColor: "#c7c5c5",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        gap: 4,
    },
    preferenceText: {
        fontWeight: "bold",
        color: "black",
    },
});

export default styles;




