import React from "react";
import { View, Text, StyleSheet, ScrollView, Vibration } from "react-native";
import WorkoutPlanCard from "../components/HomeScreenComp/WorkoutPlanCard";
import ExerciseCard from "../components/HomeScreenComp/ExerciseCard";
import bicep from "../../assets/bicep.jpg";
import pushup from "../../assets/pushup.webp";
import squat from "../../assets/squat.jpg";
import lunges from "../../assets/lunges.jpg";

const HomeScreen = ({ navigation }) => {
  const workouts = [
    { name: "Bicep Curl", duration: "15 min", image: bicep },
    { name: "Push-Ups", duration: "15 min", image: pushup },
    { name: "Squats", duration: "15 min", image: squat },
    { name: "Lunges", duration: "15 min", image: lunges },
  ];

  const triggerHaptic = () => {
    Vibration.vibrate(10);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Workout Plan</Text>
      <WorkoutPlanCard
        image={require("../../assets/exercise1.webp")}
        title="Upper Body Workouts"
        subtitle="Workouts for Beginner"
        onPress={() => {
          console.log("Go to Upper Body Workouts");
          navigation.navigate("WorkoutDetails", {
            workoutType: "upper-body",
          });
        }}
      />

      <WorkoutPlanCard
        image={require("../../assets/exercise2.jpg")}
        title="Lower Body Workouts"
        subtitle="Workouts for Beginner"
        onPress={() => {
          console.log("Go to Lower Body Workouts!");
          navigation.navigate("WorkoutDetails", {
            workoutType: "lower-body",
          });
        }}
      />

      <Text style={styles.title}>Exercise Library</Text>
      
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {workouts.map((workout, index) => (
         
         <ExerciseCard
            key={index}
            image={workout.image}
            title={workout.name}
            subtitle={`Duration: ${workout.duration}`}
            onPress={() => {
              triggerHaptic();
              console.log(`Go to ${workout.name} Workouts!`);
              navigation.navigate("WorkoutTracker");
            }}
            style={styles.exerciseCard} // Added style prop for individual cards
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: "12%",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContent: {
    flexDirection: "row", // Ensures items are in a row
    paddingHorizontal: 10,
  },
  exerciseCard: {
    marginRight: 10, // Adds spacing between cards
    width: 150, // Fixed width to ensure cards are visible and scrollable
  },
});

export default HomeScreen;