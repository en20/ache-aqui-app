import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import BusinessListCard from "./BusinessListCard";

export default function ExploreBusinessList({ businessList }) {
  return (
    <ScrollView style={{
        padding:20,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
    }}>
      <FlatList
        data={businessList}
        renderItem={({ item, index }) => (
          <View>
            <BusinessListCard
            key={index} 
            business={item}/>
          </View>
        )}
      />
      <View style={{
        height:500
      }}></View>
    </ScrollView>
  );
}