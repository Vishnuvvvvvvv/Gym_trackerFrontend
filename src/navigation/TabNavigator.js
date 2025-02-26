import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === "Home") {
            iconSource = focused
              ? require("../../assets/home.png")
              : require("../../assets/home.png");
          } else if (route.name === "Profile") {
            iconSource = focused
              ? require("../../assets/profile.png")
              : require("../../assets/profile.png");
          }

          return <Image source={iconSource} style={styles.icon} />;
        },
        tabBarShowLabel: false, // Hide text labels if needed
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  icon: {
    width: 24, // Adjust size as needed
    height: 24,
    resizeMode: "contain",
  },
});
