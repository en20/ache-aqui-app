import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function Intro({ business }) {

  const router=useRouter()
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
        <TouchableOpacity onPress={() => router.back()} style={{
          marginTop: 30
        }}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{
          marginTop:30
        }}>
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
      <View style={{
        padding:20,
        marginTop: -20,
        backgroundColor: '#fff',
        borderTopLeftRadius:25,
        borderTopRightRadius:25

      }}>
      <Text style={{
        fontSize:26,
        fontFamily:'outfit-bold',


      }}>{business?.name}</Text>
      <Text style={{
        fontFamily: 'outfit',
        fontSize:18,

      }}>{business?.adress}</Text>
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
