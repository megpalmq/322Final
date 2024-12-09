import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { auth } from "../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { router } from "expo-router";
import { TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient"; // Gradient background

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
      alert("Failed to sign in" + error.message);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
      alert("Failed to sign up" + error.message);
    }
  };

  return (
    <LinearGradient colors={["#9CECFB", "#65C7F7", "#0052D4"]} style={styles.container}>
      <SafeAreaView style={styles.formContainer}>
        <Text style={styles.title}>Sign In or Create Account</Text>
        
        <TextInput
          autoCapitalize="none"
          value={email}
          keyboardType="email-address"
          placeholder="Email Address..."
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        
        <TextInput
          value={password}
          secureTextEntry={true}
          placeholder="Password..."
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />

        <Button mode="contained" onPress={signUp} style={styles.button}>
          Create Account
        </Button>

        <Button mode="contained" onPress={signIn} style={styles.button}>
          Sign In
        </Button>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  formContainer: {
    width: "80%",
    padding: 40,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    elevation: 5,

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0052D4",
    marginBottom: 20,
    textAlign: "center",
    padding:10,
    fontFamily: "play-bold"
  },
  input: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    elevation: 3,
  },
  button: {
    width: "60%",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#3b5998",
  },
});
