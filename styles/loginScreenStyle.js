import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
        padding: 20,
        borderRadius: 10,
        margin: 20,
        
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buddy:{
        color: '#52796f'
    },
    subheader: {
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#52796f',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        color: "white",
    },
    signupText: {
        textAlign: 'center',
        marginTop: 10,
    },
    signupButton: {
        alignItems: 'center',
        marginTop: 5,
        paddingBottom: 15
    },
    signupButtonText: {
        color: '#52796f',
    },
});

export default styles