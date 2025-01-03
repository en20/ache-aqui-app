import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/FirebaseConfig';
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ business }) {
  const router = useRouter();
  const {user} =useUser()
  const OnDelete=() => {
    Alert.alert("Do you really want to delete?", "Do you really?",[

      {
        text: 'Cancel',
        style:'cancel',
      },
      {
        text:'Delete',
        style: 'destructive',
        onPress:()=>deleteBusiness()
      }
    ])
  }
  const deleteBusiness = async () => {
    console.log("Deleting Business with ID:", business?.id);
  
    // Verifique se o ID do negócio existe
    if (!business?.id) {
      console.error("Error: Business ID is undefined");
      Alert.alert("Error", "Business ID is undefined");
      return;
    }
  
    try {
      // Tenta deletar o documento
      await deleteDoc(doc(db, "BusinessList", business?.id));
      console.log("Business successfully deleted!");
      Alert.alert("Success", "Business successfully deleted!");
      router.back();
    } catch (error) {
      // Captura e exibe qualquer erro
      console.error("Error deleting business:", error);
      Alert.alert("Error", `Failed to delete business: ${error.message}`);
    }
  };
  
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 30,
          }}
        >
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 30,
          }}
        >
          <Ionicons name="heart-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: "100%",
          height: 340,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          marginTop: -20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 26,
              fontFamily: "outfit-bold",
            }}
          >
            {business?.name}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
            }}
          >
            {business?.adress}
          </Text>
        </View>
        
        {user?.primaryEmailAddress.emailAddress==business?.userEmail&&<TouchableOpacity onPress={()=> OnDelete()}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 20,
  },
});
