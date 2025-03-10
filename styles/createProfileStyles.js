import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#cad2c5",
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    marginBottom: 25,
    textAlign: "center",
  },
  inputContainer: { alignItems: "center" },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  input_bio: {
    width: "80%",
    height: 80,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#52796f",
    padding: 8,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
    width: "35%",
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
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
  avatarContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    paddingRight: 20,
    PaddingLeft: 20,
    marginBottom: 20,
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
  preferencesContainer: {
    flexDirection: "column",
    paddingLeft: 33,
    gap: 2,
  },
  selected: {
    borderColor: "grey",
  },
  plainText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 12,
    textAlign: "center",
  },
  selectContainer: {
    flexDirection: "row",
    gap: 6,
  },
  buddy: {
    color: "#52796f",
    fontWeight: "bold"
  }
});

export default styles;
