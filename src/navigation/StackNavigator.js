import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GetStarted from "../screens/GetStarted";
import SignupScreen from "../screens/SignupScreen";
import TabNavigator from "./TabNavigator";
import WorkoutDetailsScreen from "../components/Work/WorkoutDetailsScreen";
import CameraWorkoutTracker from "../components/Work/CameraWorkoutTracker";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MainApp" component={TabNavigator} />

        {/*WITHIN HOME SCREEN, stack sscreens are there , adding it */}
        {/* 1.Workout details */}
        <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
        {/*2. camera workout tracker*/}
        <Stack.Screen name="WorkoutTracker" component={CameraWorkoutTracker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
