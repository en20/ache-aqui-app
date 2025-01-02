import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { db } from '../../config/FirebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';
import CategoryItem from './CategoryItem';
import { useRouter } from 'expo-router';

export default function Category({explore=false, onCategorySelect}) {
    const [categoryList, setCategoryList] = useState([]);
    const router=useRouter();
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
    const onCategoryPressHandler=(item) => {
        if(!explore)
        {
            router.push('/businesslist/'+item.name)
        }
        else
        {
            onCategorySelect(item.name)
        }
    }
  return (
    <View>
        {!explore&& <View style={{
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
        </View>}
        <FlatList
        data={categoryList}
        horizontal={true}
        style={{
            marginLeft:10
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
            <CategoryItem 
            category={item}
            key={index} 
            onCategoryPress={(category)=>onCategoryPressHandler(item)}/>
        )}/>
    </View>
  )
}