import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import upperBody from "../../../assets/upperBodyPic.jpg";
import lowerBody from "../../../assets/lowerBodyPic.webp";
import Goback from "../../../assets/GoBack.png";
import bicep from "../../../assets/bicep.jpg";
import pushup from "../../../assets/newpushup.webp";
import squat from "../../../assets/squat.jpg";
import lunges from "../../../assets/lunges.jpg";
import CircledRight from "../../../assets/CircledRight.png";
import plank from "../../../assets/plank.jpg";
import shoulder_press from "../../../assets/shoulder_press.jpg";
import lateral_raise from "../../../assets/lateral_raise.jpg";

// This is the "WorkoutDetails" screen.
// Within the home screen when upper body workouts or lower body workout section gets clicked ,
// this is the page which gets rendered...

const WorkoutDetailsScreen = ({ navigation }) => {
  const route = useRoute();
  const { workoutType } = route.params;

  const workouts = {
    "upper-body": [
      { name: "Bicep Curl", duration: "15 min", image: bicep },
      { name: "plank", duration: "15 min", image: plank },
      { name: "shoulder_press", duration: "15 min", image: shoulder_press },
      { name: "lateral_raise", duration: "15 min", image: lateral_raise },
      { name: "Push-Ups", duration: "15 min", image: pushup },
    ],
    "lower-body": [
      { name: "Squats", duration: "15 min", image: squat },
      { name: "Lunges", duration: "15 min", image: lunges },
      { name: "plank", duration: "15 min", image: plank },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image style={styles.goBack} source={Goback}></Image>
      </TouchableOpacity>

      <Image
        style={styles.image}
        source={workoutType === "upper-body" ? upperBody : lowerBody}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 50,
        }}
      >
        {workouts[workoutType].map((workout, index) => (
          <View key={index} style={styles.card}>
            <Image style={styles.indImg} source={workout.image}></Image>
            <Text style={styles.text1}>{workout.name}</Text>
            <Text style={styles.text2}>{workout.duration}</Text>

            <TouchableOpacity
              style={styles.RightIconBtn}
              onPress={() => {
                console.log("going to camera workout tracker");
                navigation.navigate("WorkoutTracker", {
                  workoutName: workout.name,
                });
              }}
            >
              <Image style={styles.RightIcon} source={CircledRight}></Image>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes full height of the screen
    // justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally
    // padding: 10,
  },
  goBack: {
    position: "absolute",
    left: 5,
    top: 20,
    color: "white",
    zIndex: 1, // Ensures it's on top
    width: 35,
    height: 35,
  },
  scrollView: {
    width: "99%",
    borderRadius: 42,
    // padding: 30,
    paddingTop: 30,
    paddingBottom: 30,
    height: "68%",
    backgroundColor: "white",
    zIndex: 1,
    position: "absolute",
    top: "35%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    // borderWidth: 1,
    position: "relative",
    marginBottom: 15,

    width: "90%",
  },
  image: {
    width: "98%", // Full screen width
    height: "50%", // Set fixed height or adjust dynamically
    resizeMode: "cover",
    borderRadius: 12,
  },
  indImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    height: 130,
    borderRadius: 12,
  },
  text1: {
    position: "absolute",
    top: 10, // Adjusts text position
    left: 10,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Adds slight background for readability
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  text2: {
    position: "absolute",
    top: 40, // Adjusts text position
    left: 10,
    color: "red",
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Adds slight background for readability
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  RightIconBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    height: 25,
    width: 25,
  },
  RightIcon: {
    height: "100%",
    width: "100%",
  },
});

export default WorkoutDetailsScreen;
