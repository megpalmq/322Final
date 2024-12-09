import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarActiveBackgroundColor: "#939fd2",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home Page",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={"#273ea5"} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="information-circle" size={24} color={"#273ea5"} />
          ),
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: "Mailing List",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="mail" size={24} color={"#273ea5"} />
          ),
        }}
      />

      <Tabs.Screen
        name="picture"
        options={{
          title: "Picture",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="camera" size={24} color={"#273ea5"} />
          ),
        }}
      />

     
      
    </Tabs>
  );
}
