import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function BusinessListCard({ business }) {

    const router=useRouter()
  return (
    <TouchableOpacity
    onPress={() => router.push('/businessdetail/'+business?.id)} 
    style={{
        backgroundColor: '#fff',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        marginTop:15
    }}>
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: "100%",
          height: 150,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      <View
        style={{
          padding: 10,
        }}
      >
        <View style={{ marginBottom: 5 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "outfit-bold",
            }}
            numberOfLines={1}
          >
            {business.name}
          </Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "outfit-regular",
            }}
            numberOfLines={1}
          >
            {business.adress}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
