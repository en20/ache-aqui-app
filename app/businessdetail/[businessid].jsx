import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { db } from "../../config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import Reviews from "../../components/BusinessDetail/Reviews";
import About from "../../components/BusinessDetail/About";

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetBusinessDetailById();
  }, []);

  const GetBusinessDetailById = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "BusinessList", businessid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBusiness({id:docSnap.id, ...docSnap.data()});
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.error("Error fetching business detail:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.PRIMARY}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : business ? (
        <>
          <Intro business={business} />
          <ActionButton business={business} />
          <About business={business} />
          <Reviews business={business} />
          
        </>
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No business data available.
        </Text>
      )}
    </ScrollView>
  );
}
