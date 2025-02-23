import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const GetStarted = ({ navigation }) => {
  return (
    <View>
      <Text>GetStarted</Text>
      <TouchableOpacity onPress={() => navigation.push("Signup")}>
        <Text>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({});
