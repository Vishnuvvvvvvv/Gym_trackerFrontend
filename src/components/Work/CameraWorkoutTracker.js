import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View, Text, ScrollView } from "react-native";
import WebView from "react-native-webview";

// This is the WorkoutTracker page
// When any of the exercise under the Upper body/lower body workout gets selected, then this page is rendered
// Workout details for each exercise
const workoutDetails = {
  bicep_curl: {
    target: "15 min",
    instructions: [
      "1. Stand with feet shoulder-width apart, holding dumbbells.",
      "2. Curl the weights while keeping elbows close to your body.",
      "3. Lower back down slowly and repeat.",
    ],
  },
  squat: {
    target: "20 reps",
    instructions: [
      "1. Stand with feet hip-width apart.",
      "2. Bend knees and hips, lowering your body as if sitting back.",
      "3. Push back up to standing and repeat.",
    ],
  },
  plank: {
    target: "60 seconds",
    instructions: [
      "1. Get into a forearm plank position, body straight.",
      "2. Hold your body tight, engaging core and glutes.",
      "3. Maintain position for the target time.",
    ],
  },
  push_up: {
    target: "20 reps",
    instructions: [
      "1. Start in a plank position with hands shoulder-width apart.",
      "2. Lower your body until chest nearly touches the ground.",
      "3. Push back up to the starting position and repeat.",
    ],
  },
  shoulder_press: {
    target: "12 reps",
    instructions: [
      "1. Sit or stand with dumbbells at shoulder height.",
      "2. Press the weights overhead until arms are extended.",
      "3. Lower back down slowly and repeat.",
    ],
  },
  lateral_raise: {
    target: "15 reps",
    instructions: [
      "1. Stand with feet shoulder-width apart, holding dumbbells.",
      "2. Raise arms to the sides until parallel with the floor.",
      "3. Lower back down slowly and repeat.",
    ],
  },
  lunges: {
    target: "15 reps per leg",
    instructions: [
      "1. Stand tall with feet hip-width apart.",
      "2. Step forward with one leg, lowering your hips until both knees are bent at about 90 degrees.",
      "3. Push back to the starting position and repeat with the other leg.",
    ],
  },
};

export default function CameraWorkoutTracker() {
  const route = useRoute();

  const [timeElapsed, setTimeElapsed] = useState(0); // State for elapsed time
  const [aiFeedback, setAiFeedback] = useState("Analyzing form..."); // State for AI feedback
  const [workoutName, setWorkoutName] = useState("bicep_curl"); // Default workout name

  var { workoutName: routeWorkoutName = "bicep_curl" } = route.params || {}; // Default to "bicep_curl" if not provided
  if (routeWorkoutName === "Bicep Curl") {
    routeWorkoutName = "bicep_curl";
  } else if (routeWorkoutName === "Squats") {
    routeWorkoutName = "squat";
  } else if (routeWorkoutName === "plank") {
    routeWorkoutName = "plank";
  } else if (routeWorkoutName === "Lunges") {
    routeWorkoutName = "lunges";
  } else if (routeWorkoutName === "Push-Ups") {
    routeWorkoutName = "push_up";
  }
  console.log("Received workout name:", routeWorkoutName);

  // Timer for elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // Format time elapsed (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle messages from the WebView
  const handleWebViewMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    const { feedback } = data;
    console.log("WebView feedback:", feedback);
    setAiFeedback(feedback || "Analyzing form...");
  };

  // WebView URI with error handling
  const webViewUri = `https://jolly-naiad-67bb4a.netlify.app/?workout=${encodeURIComponent(
    routeWorkoutName || "bicep_curl"
  )}`;
  console.log("WebView URI:", webViewUri);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: webViewUri }}
        style={styles.webview}
        allowsInlineMediaPlayback // For camera to work
        mediaPlaybackRequiresUserAction={false} // Auto-allow camera
        onMessage={handleWebViewMessage}
        onLoad={() => console.log("WebView loaded successfully")}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView error:", nativeEvent);
          setWorkoutName("bicep_curl"); // Fallback to default if URL fails
        }}
      />

      {/* Bottom Components */}
      <ScrollView style={styles.bottomContainer}>
        {/* Time Elapsed */}
        <View style={styles.timeElapsed}>
          <Text style={styles.timeText}>Time Elapsed</Text>
          <Text style={styles.timeValue}>{formatTime(timeElapsed)}</Text>
        </View>

        {/* AI Feedback */}
        <View style={styles.aiAnalysis}>
          <Text style={styles.sectionTitle}>AI Analysis</Text>
          <Text style={styles.analysisText}>Form Analysis: {aiFeedback}</Text>
        </View>

        {/* Workout Details */}
        <View style={styles.workoutDetails}>
          <Text style={styles.sectionTitle}>Workout Details</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Exercise</Text>
            <Text style={styles.detailValue}>
              {routeWorkoutName.replace("_", " ").charAt(0).toUpperCase() +
                routeWorkoutName.replace("_", " ").slice(1)}
            </Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Target</Text>
            <Text style={styles.detailValue}>
              {workoutDetails[routeWorkoutName]?.target || "N/A"}
            </Text>
          </View>
          <Text style={styles.instructionsTitle}>Instructions</Text>
          {workoutDetails[routeWorkoutName]?.instructions?.map(
            (instruction, index) => (
              <Text key={index} style={styles.instructionText}>
                {index + 1}. {instruction}
              </Text>
            )
          ) || (
            <Text style={styles.instructionText}>
              No instructions available.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40, // Adjust for status bar if needed
    backgroundColor: "#f0f0f0",
  },
  webview: {
    width: "100%", // Full width
    height: Dimensions.get("window").height / 2,
  },
  bottomContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: "absolute",
    top: "40%",
  },
  timeElapsed: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 14,
    color: "#333",
  },
  timeValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  aiAnalysis: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  analysisText: {
    fontSize: 16,
    color: "#666",
  },
  workoutDetails: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 16,
    color: "#333",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
});
