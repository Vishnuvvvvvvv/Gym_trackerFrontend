import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CameraWorkoutTracker() {
  const [facing, setFacing] = useState("front"); // Changed to front for exercise tracking
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [exercise, setExercise] = useState("bicep_curl");
  const [feedback, setFeedback] = useState("");
  const [angle, setAngle] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const cameraRef = useRef(null);
  const wsRef = useRef(null);

  // Request camera permissions
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  // Set up WebSocket connection
  useEffect(() => {
    if (isCameraActive) {
      const ws = new global.WebSocket("ws://192.168.1.2:8000/ws"); // Replace with your server IP
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
        ws.send(`exercise:${exercise}`);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setAngle(data.angle);
        setFeedback(data.feedback);
        setCorrectCount(data.correct_count);
      };

      ws.onclose = () => console.log("WebSocket disconnected");
      ws.onerror = (error) => console.error("WebSocket error:", error);

      return () => ws.close();
    }
  }, [isCameraActive, exercise]);

  // Capture and send frames from camera
  const captureFrame = async () => {
    if (
      cameraRef.current &&
      wsRef.current &&
      wsRef.current.readyState === global.WebSocket.OPEN
    ) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
        });
        wsRef.current.send(photo.base64); // Send base64 image to server
      } catch (error) {
        console.error("Error capturing frame:", error);
      }
    }
  };

  // Periodically capture frames when camera is active
  useEffect(() => {
    if (isCameraActive) {
      const interval = setInterval(captureFrame, 500); // Capture every 500ms
      return () => clearInterval(interval);
    }
  }, [isCameraActive]);

  // Handle exercise selection
  const changeExercise = (newExercise) => {
    setExercise(newExercise);
    if (wsRef.current && wsRef.current.readyState === global.WebSocket.OPEN) {
      wsRef.current.send(`exercise:${newExercise}`);
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function startCamera() {
    setIsCameraActive(true);
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraActive ? (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.overlayContainer}>
            <View style={styles.feedbackContainer}>
              <Text style={styles.feedbackText}>Exercise: {exercise}</Text>
              <Text style={styles.feedbackText}>Angle: {angle}°</Text>
              <Text style={styles.feedbackText}>Feedback: {feedback}</Text>
              <Text style={styles.feedbackText}>
                Correct Reps: {correctCount}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => changeExercise("bicep_curl")}
              >
                <Text style={styles.text}>Bicep Curl</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => changeExercise("squat")}
              >
                <Text style={styles.text}>Squat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => changeExercise("plank")}
              >
                <Text style={styles.text}>Plank</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      ) : (
        <Button title="Start Camera" onPress={startCamera} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  feedbackContainer: {
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 20,
  },
  feedbackText: {
    fontSize: 16,
    color: "white",
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  button: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
