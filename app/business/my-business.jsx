import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, where, query} from "firebase/firestore";
import { db } from "./../../config/FirebaseConfig";
import BusinessListCard from "../../components/BusinessList/BusinessListCard1";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
export default function MyBusiness() {
  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);
  const [loading,setLoading] =useState(false)
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
        headerShown:true,
        headerTitle: 'My Business',
    })
    user && GetUserBusiness();
  }, [user]);

  const GetUserBusiness = async () => {
    setLoading(true)
    setBusinessList([]);
    const q=query(collection(db, 'BusinessList'),where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
    const querySnapshot = await getDocs(q);

    const businesses = [];
    querySnapshot.forEach((doc) => {
      console.log("Business Data:", doc.data()); // Verificar dados no console
      businesses.push({ id: doc.id, ...doc.data() });
    });

    setBusinessList(businesses);
    setLoading(false)
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        My business
      </Text>

      <FlatList
        onRefresh={GetUserBusiness}
        refreshing={loading}
        data={businessList}
        keyExtractor={(item) => item.id} // Garante uma chave única para cada item
        renderItem={({ item }) => (
          <View>
            <BusinessListCard business={item} />
          </View>
        )}
      />
    </View>
  );
}
