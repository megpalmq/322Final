// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPRim235IKxGUs9vteu4QBJUZEwppbRbo",
  authDomain: "final-c3110.firebaseapp.com",
  projectId: "final-c3110",
  storageBucket: "final-c3110.firebasestorage.app",
  messagingSenderId: "608417672266",
  appId: "1:608417672266:web:db72de6e79f61b52e48ab3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let auth;
// Initialize Firebase
if (Platform.OS === "web") {
  // For web, use a different persistence method
  auth = initializeAuth(app);
} else {
  // For mobile, use React Native AsyncStorage
  const app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

export { auth, db };
