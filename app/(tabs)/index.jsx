import { Animated, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import { Text, View } from "@/components/Themed";
import { signOut, getAuth } from "firebase/auth";
import { useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";

export default function TabOneScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity
  const [scaleAnim] = useState(new Animated.Value(0.8)); // Initial value for scale
  const [translateAnim] = useState(new Animated.Value(100)); // Initial value for translateX (slide in from the right)

  useEffect(() => {
    // Fade in effect for the content
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Scale effect for the image
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Slide-in effect for the text and button
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  const signUserOut = async () => {
    try {
      await signOut(auth).then(() => {
        console.log("user signed out");
        navigation.replace("index");
      });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#a1c4fd", "#c2e9fb"]} style={styles.content}>
        <Animated.Image
          style={[styles.IMG2, { transform: [{ scale: scaleAnim }] }]}
          source={require("../../assets/images/snooze.jpg")}
          resizeMode="cover"
        />
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          Welcome User!
        </Animated.Text>
        <Animated.Text style={[styles.paragraph, { opacity: fadeAnim }]}>
          This is a simple paragraph of filler text designed to make this app
          visually engaging and informative. Enjoy the calming gradient and
          whimsical design as you navigate through.
        </Animated.Text>
        <Animated.Text
          style={[styles.textBody, { opacity: fadeAnim, transform: [{ translateX: translateAnim }] }]}
        >
          Leaving already? 🥲
        </Animated.Text>
        <Animated.View style={{ transform: [{ translateX: translateAnim }] }}>
          <Button
            mode="contained"
            onPress={signUserOut}
            labelStyle={styles.buttonLabel}
            style={styles.button}
          >
            Sign Out
          </Button>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4d5382",
    padding: 20,
    height: "100%",
  },
  IMG2: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  content: {
    width: "90%",
    borderRadius: 15,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontFamily: "play-bold",
    fontSize: 24,
    color: "#333",
    marginBottom: 10,
  },
  textBody: {
    fontFamily: "play-bold",
    fontSize: 18,
    padding: 10,
    marginTop: 20,
  },
  paragraph: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 15,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#6200ee",
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "play-reg",
    fontSize: 18,
  },
});
