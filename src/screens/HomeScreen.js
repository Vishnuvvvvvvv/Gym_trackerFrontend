import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import WorkoutPlanCard from "../components/HomeScreenComp/WorkoutPlanCard";

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Todays Workout plan</Text>
      <WorkoutPlanCard
        image={require("../../assets/exercise1.webp")}
        title="Upper Body Workouts"
        subtitle="Workouts for Beginner"
        onPress={() => {
          console.log("Go to Upper Body Workouts");

          navigation.navigate("WorkoutDetails", {
            workoutType: "upper-body", // or "lower-body"
          });
        }}
      />

      <Text style={styles.title}>Bonus Workout</Text>
      <WorkoutPlanCard
        image={require("../../assets/exercise2.jpg")}
        title="Lower Body Workouts"
        subtitle="Workouts for Beginner"
        onPress={() => {
          console.log("Go to Lower Body Workouts!");
          navigation.navigate("WorkoutDetails", {
            workoutType: "lower-body", // or "lower-body"
          });
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: { fontSize: 24, fontWeight: "bold" },
});

export default HomeScreen;
