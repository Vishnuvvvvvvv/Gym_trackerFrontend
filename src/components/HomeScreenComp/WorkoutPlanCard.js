import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

// This card is used as a component inside
// the home screen : for upper body & lower body section inside the home screen

const WorkoutPlanCard = ({ title, image, subtitle, onPress }) => {
  console.log("text ", image);
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity style={styles.goButton} onPress={onPress}>
        <Text style={styles.goText}>GO</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutPlanCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 35,
    marginLeft: 3,
    marginRight: 3,
  },
  image: {
    width: "100%",
    height: 170,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 10,
    position: "absolute",
    bottom: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
  goButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
  },
  goText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
