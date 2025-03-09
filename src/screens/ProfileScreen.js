import React, { useState, useEffect } from "react";
import { Alert, Linking } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { backendIp } from "../../apiConfig";

export default function ProfilePage({ navigation }) {
  const [displayName, setDisplayName] = useState("user"); // Default display name
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [tempName, setTempName] = useState(""); // Temporary state for input
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  // Load the username from AsyncStorage when the component mounts
  useEffect(() => {
    const loadUsername = async () => {
      try {
        const storedName = await AsyncStorage.getItem("displayName");
        const token = await AsyncStorage.getItem("authToken");

        if (storedName) {
          setDisplayName(storedName);
        } else {
          const response = await axios.get(`${backendIp}/api/username`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("cehcking for username in backend...");
          const username = response.data.username;
          if (username) {
            setDisplayName(username);
            // Cache locally in AsyncStorage
            await AsyncStorage.setItem("displayName", username);
          }
        }
      } catch (error) {
        console.error("Error loading username:", error);
      }
    };
    loadUsername();
  }, []);

  // Function to handle Edit Profile
  const handleEditProfile = () => {
    setTempName(displayName); // Pre-fill with current name
    setModalVisible(true); // Show the modal
  };

  // Function to save the edited profile
  const save = async () => {
    setChangePassword(!changePassword);
    try {
      const userToken = await AsyncStorage.getItem("authToken");
      let updatesMade = false;

      // Username update
      if (tempName && tempName.trim()) {
        setDisplayName(tempName.trim());
        await AsyncStorage.setItem("displayName", tempName.trim());

        const usernameResponse = await axios.put(
          `${backendIp}/api/edit-profile`,
          { username: tempName.trim() },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Username saved:", tempName.trim());
        updatesMade = true;
      }

      // Password update
      if (
        oldPassword &&
        oldPassword.trim() &&
        newPassword &&
        newPassword.trim()
      ) {
        const passwordResponse = await axios.put(
          `${backendIp}/api/edit-profile`,
          {
            oldPassword: oldPassword.trim(),
            newPassword: newPassword.trim(),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Password updated successfully");
        updatesMade = true;
      }

      if (updatesMade) {
        setModalVisible(false);

        setTempName("");
        setOldPassword("");
        setNewPassword("");
      } else {
        console.log("No updates were made - no fields filled");
      }
    } catch (error) {
      console.error("Error saving the profile :", error);

      // Extract meaningful error message
      let errorMessage = "An unexpected error occurred"; // Default message

      if (error.response) {
        errorMessage = error.response.data.message || "Failed to save changes";
      } else if (error.message) {
        errorMessage = error.message; // Handle generic network errors
      }

      Alert.alert("Updating profile failed", errorMessage);
      setError(errorMessage); // Update error state
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clear all AsyncStorage data
      console.log("AsyncStorage cleared successfully");
      setDisplayName("User"); // Reset display name to default
      navigation.replace("GetStarted");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
      // Still navigate even if clearing fails, to ensure logout proceeds
      navigation.replace("GetStarted");
    }
  };

  // Function for "About Us"
  const handleAboutUs = () => {
    Alert.alert(
      "About Us",
      "FormFix is a fitness app designed to help users optimize their workouts and maintain proper exercise form."
    );
  };

  // Function for "Support Center"
  const handleSupportCenter = () => {
    Alert.alert(
      "Support Center",
      "Need help? Reach out to our support team at:\n\nEmail: exerciseappsupport@gmail.com"
    );
  };

  // Function for "Contact Us"
  const handleContactUs = () => {
    Alert.alert(
      "Contact Us",
      "For any queries, contact our administrators:\n\n" +
        "📞 Vivek S: 75609 37769\n" +
        "📞 Harikrishna J: 884 881 5184\n" +
        "📞 Alfred Shyjo: 79941 67767\n\n" +
        "📧 Email: exerciseappsupport@gmail.com",
      [
        {
          text: "Email Us",
          onPress: () => Linking.openURL("mailto:exerciseappsupport@gmail.com"),
        },
        { text: "OK", style: "cancel" },
      ]
    );
  };

  // Update the menu items with the functions
  const menuItems = [
    { title: "Edit profile", icon: "person", onPress: handleEditProfile },
    // { title: "Workout Preferences", icon: "fitness-center" },
    { title: "About Us", icon: "info", onPress: handleAboutUs },
    { title: "Support Center", icon: "help", onPress: handleSupportCenter },
    { title: "Contact Us", icon: "email", onPress: handleContactUs },
    { title: "Share FormFix App", icon: "share" },
  ];

  const [changePassword, setChangePassword] = useState(false);
  //
  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Hello </Text>
      </View> */}

      {/* Display Name */}
      <Text style={styles.displayName}>Hello {displayName}</Text>

      {/* Thank You Message */}
      <View style={styles.thankYouContainer}>
        <Text style={styles.thankYouText}>
          Thank you for supporting us! Let’s get you on the path to better
          posture and a healthier you
        </Text>
      </View>

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={item.onPress || (() => console.log(`${item.title} pressed`))}
        >
          <Icon
            name={item.icon}
            size={24}
            color="#FF4040"
            style={styles.icon}
          />
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.menuItem, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Icon
          name="exit-to-app"
          size={24}
          color="#FF4040"
          style={styles.icon}
        />
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>

      {/* Modal for Editing Username */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Enter new username"
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              onPress={() => {
                setChangePassword(!changePassword);
              }}
            >
              <Text style={{ color: "blue", marginBottom: 10 }}>
                {changePassword ? "" : "Change Password"}
              </Text>
            </TouchableOpacity>

            {changePassword && (
              <>
                <TextInput
                  style={styles.input}
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  placeholder="Old password"
                  placeholderTextColor="#888"
                  secureTextEntry
                />

                <TextInput
                  style={styles.input}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="New password"
                  placeholderTextColor="#888"
                />
              </>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false), setChangePassword(false);
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={save}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  displayName: {
    marginTop: 30,
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
  },
  thankYouContainer: {
    backgroundColor: "#FF4040",
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thankYouText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  logoutButton: {
    marginTop: 20,
    borderBottomWidth: 0,
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
    color: "#000000",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#FF4040",
    borderRadius: 5,
    marginLeft: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: "#000000",
  },
});
