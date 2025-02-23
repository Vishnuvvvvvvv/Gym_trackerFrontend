import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup Screen</Text>
      <TouchableOpacity onPress={() => navigation.replace("MainApp")}>
        <Text>Go to App</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});

export default SignupScreen;
