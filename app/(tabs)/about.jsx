import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const About = () => {
  // Animation setup
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity set to 0

 

  useEffect(() => {
    // Fade in the title when the component mounts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  

  return (
    <LinearGradient
      colors={["#a8c0ff","#3f2b96"]} 
      style={styles.container}
    >
      <View style={styles.card}>
      
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          Welcome to Our World 🌎
        </Animated.Text>
        <Text style={styles.content}>
          At Our Company, we believe in pushing the boundaries of innovation and design. We are
          committed to making a difference and delivering high-quality services to our clients.
          Join us as we embark on a journey toward greatness.
        </Text>

        <Pressable
          onPress={() => console.log("More Info Pressed")}
          style={({ pressed }) => [
            styles.button,
            {
              transform: [{ scale: pressed ? 1.1 : 1 }],
            },
          ]}
        >
          <Text style={styles.buttonText}>Learn More</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  backgroundImage: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    opacity: 0.1, 
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#273ea5",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "play-bold",
  },
  content: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginVertical: 15,
    lineHeight: 25,
    fontFamily: "play-reg",
  },
  button: {
    backgroundColor: "#273ea5",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default About;