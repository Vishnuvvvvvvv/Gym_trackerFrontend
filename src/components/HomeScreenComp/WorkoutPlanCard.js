import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

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
    marginBottom: 10,
    marginLeft: 3,
    marginRight: 3,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "red",
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
