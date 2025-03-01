import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { backendIp } from "../../apiConfig";

const CreateAccount = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    console.log("Email: ", email, " password: ", password);
    try {
      const response = await axios.post(`http://${backendIp}:7000/signup`, {
        email,
        password,
      });

      if (response.data.message === "User registered successfully") {
        navigation.replace("MainApp"); // Navigate to MainApp if login is successful
      }
    } catch (error) {
      console.log("error ", error);
      Alert.alert(
        "Signup Failed",
        error.response?.data?.error || "Something went wrong"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TouchableOpacity style={styles.backButton}>
        <Image
          style={styles.backButtonIcon}
          source={require("../../assets/GoBack.png")}
        ></Image>
      </TouchableOpacity>

      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="tsmith@email.com"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="********"
          placeholderTextColor="#999"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.centerContainer}>
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>Don't have an account yet?</Text>
        <TouchableOpacity style={styles.createAccountButton}>
          <Text style={styles.createAccountButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: "40%",
    marginLeft: "6%",
  },

  backButton: {
    // borderWidth:1,
    // width:10,
    // height:10,

    position: "absolute",
    top: 50,
    left: 10,
  },
  backButtonIcon: {
    width: 40,
    height: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
    marginLeft: "6%",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop: 5,
    marginLeft: "6%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginTop: 5,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    marginLeft: "6%",
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  signInButton: {
    width: "90%",

    backgroundColor: "#E63946",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  signInText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccountContainer: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: "50%",
  },

  createAccountText: {
    fontSize: 14,
    color: "#666",
  },
  createAccountButton: {
    borderWidth: 2,
    borderColor: "#E63946",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  createAccountButtonText: {
    color: "#E63946",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateAccount;
