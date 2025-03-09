import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }) => {
  // Function to navigate to CreateAccount screen
  const handleFinish = () => {
    navigation.replace("CreateAccount");
  };

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      loop={false}
      paginationStyle={styles.pagination}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    >
      {/* Slide 1 */}
      <View style={styles.slide}>
        <Text style={styles.title}>Personal AI Trainer</Text>
        <Image
          source={require("../../assets/Pushups.png")} // Replace with your image path
          style={styles.image}
        />
        <Text style={styles.description}>
          Create your own personalized workout routine from our selection of
          exercises and programs.
        </Text>
      </View>

      {/* Slide 2 */}
      <View style={styles.slide}>
        <Text style={styles.title}>Your pocket sized personal trainer</Text>
        <Image
          source={require("../../assets/Squats.png")} // Replace with your image path
          style={styles.image}
        />
        <Text style={styles.description}>
          A personal trainer made just for you, tailored to satisfy all your
          needs
        </Text>
      </View>

      {/* Slide 3 */}
      <View style={styles.slide}>
        <Text style={styles.title}>Stay active, Stay in shape</Text>
        <Image
          source={require("../../assets/Exercise.png")} // Replace with your image path
          style={styles.image}
        />
        <Text style={styles.description}>
          Reach your fitness goals with personalized plans and expert guidance.
          Embark your journey on a path to a new you
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: width * 0.5,
    height: height * 0.2,
    resizeMode: "contain",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#FF3B30",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pagination: {
    bottom: 70,
  },
  dot: {
    backgroundColor: "#ccc",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#000",
    width: 12, // Larger size for active dot
    height: 12,
    borderRadius: 6,
    margin: 3,
  },
});

export default OnboardingScreen;
