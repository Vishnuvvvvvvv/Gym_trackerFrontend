import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";
import WebView from "react-native-webview";
import * as Speech from "expo-speech";

// import back from "../../../assets/GoBack.png";
// This is the WorkoutTracker page
// When any of the exercise under the Upper body/lower body workout/ExerciseLibrary gets selected, then this page is rendered
// Workout details for each exercise
const workoutDetails = {
  bicep_curl: {
    target: "2 min",
    instructions: [
      "1. Stand with feet shoulder-width apart, holding dumbbells.",
      "2. Curl the weights while keeping elbows close to your body.",
      "3. Lower back down slowly and repeat.",
    ],
  },
  squat: {
    target: "10 sec",
    instructions: [
      "1. Stand with feet hip-width apart.",
      "2. Bend knees and hips, lowering your body as if sitting back.",
      "3. Push back up to standing and repeat.",
    ],
  },
  plank: {
    target: "60 sec",
    instructions: [
      "1. Get into a forearm plank position, body straight.",
      "2. Hold your body tight, engaging core and glutes.",
      "3. Maintain position for the target time.",
    ],
  },
  push_up: {
    target: "20 min",
    instructions: [
      "1. Start in a plank position with hands shoulder-width apart.",
      "2. Lower your body until chest nearly touches the ground.",
      "3. Push back up to the starting position and repeat.",
    ],
  },
  shoulder_press: {
    target: "12 min",
    instructions: [
      "1. Sit or stand with dumbbells at shoulder height.",
      "2. Press the weights overhead until arms are extended.",
      "3. Lower back down slowly and repeat.",
    ],
  },
  lateral_raise: {
    target: "15 min",
    instructions: [
      "1. Stand with feet shoulder-width apart, holding dumbbells.",
      "2. Raise arms to the sides until parallel with the floor.",
      "3. Lower back down slowly and repeat.",
    ],
  },
  lunges: {
    target: "15 min",
    instructions: [
      "1. Stand tall with feet hip-width apart.",
      "2. Step forward with one leg, lowering your hips until both knees are bent at about 90 degrees.",
      "3. Push back to the starting position and repeat with the other leg.",
    ],
  },
};

export default function CameraWorkoutTracker({ navigation }) {
  const route = useRoute();

  const [timeElapsed, setTimeElapsed] = useState(0); // State for elapsed time
  const [aiFeedback, setAiFeedback] = useState("Analyzing form..."); // State for AI feedback
  const [workoutName, setWorkoutName] = useState("bicep_curl"); // Default workout name
  const [timerId, setTimerId] = useState(null); // Store timer ID to clear it later

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

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

  const [countdown, setCountdown] = useState(10);
  const [showCountdown, setShowCountdown] = useState(false);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);

  const getTargetTimeInSeconds = (target) => {
    if (!target) return Infinity; // Return Infinity if no target (to prevent finishing)

    const timeParts = target.split(" ");
    const value = parseInt(timeParts[0]);

    if (timeParts[1].includes("min")) {
      return value * 60; // Convert minutes to seconds
    } else if (timeParts[1].includes("sec")) {
      return value; // Already in seconds
    }
    return Infinity; // Default case
  };

  // Show Alert When Workout Ends
  const finishWorkout = () => {
    setIsWorkoutActive(false);
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    Speech.speak("Workout finished!");
    Alert.alert("Workout Complete", "You have achieved your target!", [
      { text: "OK", onPress: resetTimer },
    ]);
  };

  useEffect(() => {
    const speakAndCountDown = async () => {
      for (let i = countdown; i > 0; i--) {
        await new Promise((resolve) => {
          Speech.speak(i.toString(), {
            onDone: resolve, // Wait for speech to finish before continuing
          });
        });

        setCountdown(i - 1);
      }

      // After countdown ends, speak "Go!"
      await new Promise((resolve) => {
        Speech.speak("Go!", {
          onDone: resolve,
        });
      });

      setShowCountdown(false);
      startTimer();
    };

    if (showCountdown) {
      speakAndCountDown();
    }
  }, [showCountdown]);

  const startCountDown = () => {
    setCountdown(10);
    setIsWorkoutActive(true);
    setShowCountdown(true);
  };

  // Start timer function
  // const startTimer = () => {
  //   if (!timerId) {
  //     const targetSeconds = getTargetTimeInSeconds(workoutDetails[routeWorkoutName]?.target);
  //     // Only start if no timer is running
  //     const id = setInterval(() => {
  //       setTimeElapsed((prev) => prev + 1);
  //     }, 1000);
  //     setTimerId(id);
  //     setStart(true);
  //   }
  // };

  const startTimer = () => {
    if (!timerId) {
      console.log(workoutDetails[routeWorkoutName]?.target, " =>target time");

      const targetSeconds = getTargetTimeInSeconds(
        workoutDetails[routeWorkoutName]?.target
      );
      console.log(targetSeconds);
      const id = setInterval(() => {
        setTimeElapsed((prev) => {
          const newTime = prev + 1;
          // Check if target time is reached
          console.log(
            "target time : ",
            targetSeconds,
            "new time: ",
            newTime,
            " setIsWorkoutActive ",
            isWorkoutActive
          );
          if (newTime >= targetSeconds && isWorkoutActive) {
            finishWorkout();
            clearInterval(id); // Stop the timer
            setTimerId(null);
            return prev; // Don't increment past target
          }
          return newTime;
        });
      }, 1000);
      setTimerId(id);
      setStart(true);
      // setIsWorkoutActive(true); // Start the workout
    }
  };

  // Reset timer function
  // const resetTimer = () => {
  //   if (timerId) {
  //     clearInterval(timerId);
  //     setTimerId(null);
  //   }
  //   setStart(false);
  //   setTimeElapsed(0);
  // };

  const resetTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    setStart(false);
    setIsWorkoutActive(false);
    setTimeElapsed(0);
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerId]);

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
  const webViewUri = `https://beautiful-bublanina-89a0bf.netlify.app/?workout=${encodeURIComponent(
    routeWorkoutName || "bicep_curl"
  )}`;
  console.log("WebView URI:", webViewUri);

  const [start, setStart] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        {/* <Text>GoBack</Text> */}
        <Image
          style={styles.backButtonIcon}
          source={require("../../../assets/GoBack.png")}
        ></Image>
      </TouchableOpacity>

      <WebView
        source={{ uri: webViewUri }}
        style={styles.webview}
        // allowsInlineMediaPlayback // For camera to work
        // mediaPlaybackRequiresUserAction={false} // Auto-allow camera
        // onMessage={handleWebViewMessage}
        // onLoad={() => console.log("WebView loaded successfully")}
        // onError={(syntheticEvent) => {
        //   const { nativeEvent } = syntheticEvent;
        //   console.error("WebView error:", nativeEvent);
        //   setWorkoutName("bicep_curl"); // Fallback to default if URL fails
        // }}

        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        javaScriptEnabledAndroid={true}
        originWhitelist={["*"]}
        scalesPageToFit={true}
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
        onMessage={handleWebViewMessage}
        onLoad={() => console.log("WebView loaded successfully")}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView error:", nativeEvent);
          setWorkoutName("bicep_curl");
        }}
      />

      {/* Bottom Components */}
      <ScrollView style={styles.bottomContainer}>
        {!start ? (
          <View style={styles.timeElapsed}>
            <TouchableOpacity style={styles.timeText} onPress={startCountDown}>
              <View style={styles.startText}>
                <Text style={{ fontWeight: "bold" }}>Start</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.timeElapsed}>
            <Text style={styles.timeText}>Time Elapsed</Text>
            <Text style={styles.timeValue}>{formatTime(timeElapsed)}</Text>

            <TouchableOpacity style={styles.resetView} onPress={resetTimer}>
              {/* <Image
                source={require("../../../assets/Reset.png")}
                style={styles.resetIcon}
              /> */}
              <Text>Reset</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Countdown Popup */}
        <Modal transparent={true} visible={showCountdown} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.countdownText}>{countdown}</Text>
            </View>
          </View>
        </Modal>

        {/* AI Feedback */}
        {start && (
          <View style={styles.aiAnalysis}>
            <Text style={styles.sectionTitle}>AI Analysis</Text>
            <Text style={styles.analysisText}>Form Analysis: {aiFeedback}</Text>
          </View>
        )}

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
    height: "100%",
  },
  webview: {
    width: "100%", // Full width
    // height: Dimensions.get("window").height / 2,
    // height: "40%",
    flex: 0.4,
  },
  backButton: {
    // borderWidth:1,
    // width:10,
    // height:10,

    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 999,
  },
  backButtonIcon: {
    width: 40,
    height: 40,
  },
  bottomContainer: {
    // flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: "absolute",
    top: "35%",
    height: "65%",
    // height: Dimensions.get("window").height / 2,
    width: "100%",
  },
  timeElapsed: {
    // flex: 0.2,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 5,

    // height: "10%",
  },
  timeText: {
    fontSize: 14,
    fontWeight: "bold",
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
    marginTop: 5,
    // height: "20%",
    // flex: 0.3,
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
    // flex: 2,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // minHeight: "70%",
    // position: "realtive",
    // bottom: 1,
    // borderWidth: 2,
    height: "85%",
    marginTop: 5,
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
    marginTop: 30,
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },

  resetIcon: {
    width: 20,
    height: 20,
  },
  resetView: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 220, // Circular size
    height: 220, // Circular size
    borderRadius: 110, // Half of width/height to make it a circle
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderColor: "red",
    borderWidth: 10,
  },
  countdownText: {
    fontSize: 67,
    fontWeight: "bold",
    color: "red",
  },
  startText: {
    width: 90, // Circular size
    height: 90, // Circular size
    borderRadius: 60, // Half of width/height to make it a circle
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderColor: "red",
    borderWidth: 10,
  },
});
