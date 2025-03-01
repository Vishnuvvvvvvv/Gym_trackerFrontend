import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Using MaterialIcons for simplicity
// import { useNavigation } from "@react-navigation/native"; // Import navigation hook

export default function ProfilePage({ navigation }) {
  const [displayName, setDisplayName] = React.useState("[Display Name]"); // Default display name

  const handleEditProfile = () => {
    console.log("Edit Profile pressed");
    // Add navigation or modal logic here to edit the name
    setDisplayName("Updated Name");
  };

  // Function to handle logout
  const handleLogout = () => {
    console.log("Logout pressed");

    navigation.replace("Signup"); // Replace with your login screen name
  };

  // Navigation options with icons and labels
  const menuItems = [
    { title: "Workout Preferences", icon: "fitness-center" },
    { title: "About Us", icon: "info" },
    { title: "Support Center", icon: "help" },
    { title: "Contact Us", icon: "email" },
    { title: "Share FormFix App", icon: "share" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello.</Text>
      </View>

      {/* Display Name */}
      <Text style={styles.displayName}>{displayName}</Text>

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
          onPress={() => console.log(`${item.title} pressed`)}
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
        style={[styles.menuItem, styles.logoutButton]} // Add logout-specific styling
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 40, // Adjust for status bar
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
    // textAlign: "center",
  },
  thankYouContainer: {
    backgroundColor: "#FF4040", // Red background as in the screenshot
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
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
    marginTop: 20, // Add space above logout button
    borderBottomWidth: 0, // Remove bottom border for logout
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
    color: "#000000",
  },
});
