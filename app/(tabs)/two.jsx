import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, ScrollView, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Text } from "@/components/Themed";
import { db } from "@/FirebaseConfig";
import { collection, addDoc, getDocs, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function TabTwoScreen() {
  const [userName, setUserName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "ReactUser"), (snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      setData(docs);
    });


    return () => unsubscribe();
  }, []);

  const addUser = async () => {
    const userObj = {
      name: userName,
    };

    await addDoc(collection(db, "ReactUser"), userObj)
      .then((docRef) => {
        setUserName("");
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error.message);
      });
  };

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "ReactUser", id));
      console.log("user deleted", id);
    } catch (e) {
      console.error("error deleting user", e);
    }
  };

  const showNames = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ReactUser"));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setData(docs);
    } catch (e) {
      console.error("Error getting documents: ", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mailing List</Text>

      <View style={styles.form}>
        <TextInput
          autoCapitalize="none"
          value={userName}
          placeholder="Add Person's Name"
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
        />
        <Button mode="contained" onPress={addUser} style={styles.button}>
          Add Person
        </Button>
        <Button mode="contained" onPress={showNames} style={styles.button}>
          Show Names
        </Button>
      </View>

      {/* List of names */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
            <Button
              mode="outlined"
              onPress={() => deleteUser(item.id)}
              style={styles.deleteButton}
            >
              Delete
            </Button>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:100,
    flex: 1,
    backgroundColor: "#bec5e4", 
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#273ea5",
    fontFamily :"play-bold"
  },
  form: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#f9f9f9", 
    borderRadius: 8,
    padding: 10,
    fontFamily :"play-bold"
  },
  button: {
    marginVertical: 5,
    backgroundColor: "#273ea5", 
    borderRadius: 8,

  },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
    fontWeight: "600",
  },
  deleteButton: {
    marginTop: 10,
    borderColor: "#ff4d4d", 
    borderWidth: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd", 
    marginVertical: 10,
  },
});
