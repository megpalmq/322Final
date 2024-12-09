import { Alert, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient"; // Gradient background

export default function Picture() {
  const [image, setImage] = useState(null);

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveToCameraRoll = async () => {
    if (!image) {
      Alert.alert("No image to save");
      return;
    }

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    try {
      await MediaLibrary.saveToLibraryAsync(image);
      Alert.alert("Success: Image saved to camera roll 😊");
    } catch (error) {
      Alert.alert("Failed saving image 😔", error.message);
    }
  };

  return (
    <LinearGradient colors={["#2193b0", "#6dd5ed"]} style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Capture and Save Your Picture</Text>
        <Button mode="contained" onPress={takePicture} style={styles.button}>
          Take Picture 📸
        </Button>

        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}

        {image && (
          <Button mode="contained" onPress={saveToCameraRoll} style={styles.saveButton}>
            Save to Camera Roll 🥐
          </Button>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#273ea5",
    marginBottom: 20,
    textAlign: "center",
    fontFamily :"play-bold"
  },
  button: {
    backgroundColor: "#273ea5",
    width: "100%",
    borderRadius: 8,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    width: "100%",
    borderRadius: 8,
    marginTop: 20,
  },
  imageContainer: {
    marginTop: 20,
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 5,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});