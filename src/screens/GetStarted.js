import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

const GetStarted = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("./../../assets/icon.png")} style={styles.logo} />

      {/* App Name */}
      <Text style={styles.title}>
        Form<Text style={styles.highlight}>Fix</Text>
      </Text>

      <View style={styles.downContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Onboarding")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Sign-In Link */}
        <TouchableOpacity
          style={styles.signInText}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.signInLink}>Already a member? Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  downContainer: {
    position: "relative",
    // borderWidth:1,
    top: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  highlight: {
    color: "#E63946", // Red color for "Fix"
  },
  button: {
    marginTop: 40,
    backgroundColor: "#E63946", // Red button
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signInText: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
  },
  signInLink: {
    color: "#E63946",
    fontWeight: "bold",
  },
});
