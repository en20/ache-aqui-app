import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Category from '../../components/Home/Category'
import { ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { getDocs, query, where } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useState } from 'react';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';

export default function explore() {
  const [businessList, setBusinessList] = useState([])
  const GetbusinessByCategory = async (category) => {
    setBusinessList([]); // Limpa a lista antes de buscar os novos negócios
    const q = query(collection(db, 'BusinessList'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    const newBusinessList = []; // Lista temporária para armazenar os resultados
    querySnapshot.forEach((doc) => {
      newBusinessList.push({ id: doc.id, ...doc.data() });
    });
    setBusinessList(newBusinessList); // Atualiza a lista de negócios com os novos dados
  };
  
  return (
    <View style={{
      paddingTop:50
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize:25,
        marginLeft:20
      }}>Explore More</Text>
       <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap:10,
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 10,
            marginVertical:10,
            marginTop:15,
            borderRadius: 8,
            marginHorizontal:20,
            borderWidth:1,
            borderColor: Colors.PRIMARY
            
        }}>
            <Feather name="search" size={24} color={Colors.PRIMARY} />
            <TextInput placeholder='Pesquisar...' placeholderTextColor="#000" style={{
                fontFamily:'outfit',
                fontSize:16,
            }} />
        </View>
      <Category explore={true}
      onCategorySelect={(category)=> GetbusinessByCategory(category)}/>
      <ExploreBusinessList businessList={businessList}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    
  },
});