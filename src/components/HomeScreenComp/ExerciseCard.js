import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

const ExerciseCard = ({ title, image, subtitle, onPress }) => {
  console.log("text ", image);
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {/* <Text style={styles.subtitle}>{subtitle}</Text> */}
      </View>
      <TouchableOpacity style={styles.goButton} onPress={onPress}>
        <Text style={styles.goText}>GO</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExerciseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 10,
    marginLeft: 3,
    marginRight: 3,
    width:150,
    // borderWidth:1
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    padding: 10,
    position:"absolute",
    bottom:2,
    // backgroundColor:"red"

  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color:"white",
    marginBottom:3,
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
