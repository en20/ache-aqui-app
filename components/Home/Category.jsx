import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { db } from '../../config/FirebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';
import CategoryItem from './CategoryItem';

export default function Category() {
    const [categoryList, setCategoryList] = useState([]);
        useEffect(() =>{
            GetCategoryList()
        },[])
    const GetCategoryList = async () => {
        setCategoryList([]);
        const q = query(collection(db, 'Category'));
        const querySnapShot = await getDocs(q);
        const categories = [];
        querySnapShot.forEach((doc) => {
          console.log(doc.data())
          categories.push(doc.data())
        });
        setCategoryList(categories);
      };
  return (
    <View>
        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems: 'center',
            alignContent:'center',
            justifyContent: 'space-between',
            marginTop:10,
            padding:20
        }}>
        <Text style={{
            fontSize:20,
            fontFamily: 'outfit-bold'
        }}>Category</Text>
        <Text style={{color:Colors.PRIMARY, fontFamily: 'outfit-medium' }}>View All</Text>
        </View>
        <FlatList
        data={categoryList}
        horizontal={true}
        style={{
            marginLeft:10
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
            <CategoryItem category={item} key={index}/>
        )}/>
    </View>
  )
}